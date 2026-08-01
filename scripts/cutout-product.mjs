import sharp from "sharp";

const SRC = new URL("../assets/al-arifa-5l-source.jpeg", import.meta.url).pathname;
const OUT = new URL("../public/product/al-arifa-5l.webp", import.meta.url).pathname;

/**
 * Détourage du bidon.
 *
 * Le fond du studio est noir pur, mais le corps du bidon l'est presque aussi :
 * un remplissage par diffusion fuit à travers les zones sombres du filet doré.
 * On s'appuie donc sur la géométrie : le produit est convexe ligne par ligne
 * (corps rectangulaire + anse centrée), donc pour chaque ligne on ne garde que
 * l'intervalle entre le premier et le dernier pixel non noir.
 */

/** Le filet doré dépasse largement ce seuil ; le bruit JPEG du fond non. */
const THRESHOLD = 45;
/** Longueur minimale d'une suite continue de pixels éclairés (anti-bruit). */
const MIN_RUN = 3;
/** Nombre minimal de pixels éclairés pour qu'une ligne compte comme du produit. */
const MIN_HITS = 10;
/** Demi-fenêtre de lissage vertical des bords, en pixels. */
const SMOOTH = 4;

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const left = new Int32Array(H).fill(-1);
const right = new Int32Array(H).fill(-1);

for (let y = 0; y < H; y++) {
  let first = -1;
  let last = -1;
  let hits = 0;
  let run = 0;
  for (let x = 0; x < W; x++) {
    const o = (y * W + x) * C;
    if (Math.max(data[o], data[o + 1], data[o + 2]) > THRESHOLD) {
      run++;
      // On ne valide un bord qu'une fois la suite assez longue pour ne pas
      // être un pixel de bruit isolé, d'où le recul de MIN_RUN.
      if (run >= MIN_RUN) {
        if (first < 0) first = x - MIN_RUN + 1;
        last = x;
        hits++;
      }
    } else {
      run = 0;
    }
  }
  if (hits >= MIN_HITS) {
    left[y] = first;
    right[y] = last;
  }
}

// Lissage : on prend l'enveloppe la plus large sur une petite fenêtre,
// ce qui absorbe le bruit JPEG sans ronger la silhouette.
const sLeft = new Int32Array(H).fill(-1);
const sRight = new Int32Array(H).fill(-1);
for (let y = 0; y < H; y++) {
  let lo = Infinity;
  let hi = -Infinity;
  for (let k = -SMOOTH; k <= SMOOTH; k++) {
    const j = y + k;
    if (j < 0 || j >= H || left[j] < 0) continue;
    if (left[j] < lo) lo = left[j];
    if (right[j] > hi) hi = right[j];
  }
  if (hi >= lo) {
    sLeft[y] = lo;
    sRight[y] = hi;
  }
}

/*
 * Les flancs du corps sont presque noirs entre les frises dorées : le balayage
 * y renvoie un intervalle trop étroit et découpe le bidon en lanières.
 * On identifie donc la plage du corps (lignes proches de la largeur maximale)
 * et on lui impose une enveloppe rectangulaire unique. L'anse et les arrondis
 * situés au-dessus/au-dessous gardent leur détourage ligne à ligne.
 */
let maxWidth = 0;
for (let y = 0; y < H; y++) {
  if (sLeft[y] >= 0) maxWidth = Math.max(maxWidth, sRight[y] - sLeft[y]);
}

let bodyTop = -1;
let bodyBottom = -1;
let bodyLeft = W;
let bodyRight = 0;
for (let y = 0; y < H; y++) {
  if (sLeft[y] < 0 || sRight[y] - sLeft[y] < maxWidth * 0.7) continue;
  if (bodyTop < 0) bodyTop = y;
  bodyBottom = y;
  bodyLeft = Math.min(bodyLeft, sLeft[y]);
  bodyRight = Math.max(bodyRight, sRight[y]);
}

for (let y = bodyTop; y <= bodyBottom; y++) {
  sLeft[y] = bodyLeft;
  sRight[y] = bodyRight;
}

console.log(
  `corps : lignes ${bodyTop}→${bodyBottom}, x ${bodyLeft}→${bodyRight} (largeur max ${maxWidth})`,
);

const alpha = Buffer.alloc(W * H, 0);
for (let y = 0; y < H; y++) {
  if (sLeft[y] < 0) continue;
  alpha.fill(255, y * W + sLeft[y], y * W + sRight[y] + 1);
}

// Adoucit l'escalier des angles arrondis.
// `blur` repasse en sRGB : on force le gris pour récupérer bien 1 canal.
const soft = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } })
  .blur(1.2)
  .toColourspace("b-w")
  .raw()
  .toBuffer();

if (soft.length !== W * H) {
  throw new Error(`masque inattendu : ${soft.length} octets pour ${W * H} pixels`);
}

const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const o = i * C;
  rgba[i * 4] = data[o];
  rgba[i * 4 + 1] = data[o + 1];
  rgba[i * 4 + 2] = data[o + 2];
  rgba[i * 4 + 3] = soft[i];
}

let minX = W;
let minY = H;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (soft[y * W + x] > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const pad = 6;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(W - 1, maxX + pad);
maxY = Math.min(H - 1, maxY + pad);

console.log(`silhouette : x ${minX}→${maxX}, y ${minY}→${maxY} (source ${W}×${H})`);

await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .resize({ width: 1000, withoutEnlargement: true })
  // WebP avec alpha : ~10× plus léger qu'un PNG pour un rendu identique,
  // ce qui compte sur un visuel affiché plein écran en mobile.
  .webp({ quality: 88, effort: 6 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log("écrit :", OUT, `${meta.width}×${meta.height}`, `${(meta.size / 1024) | 0} Ko`);
