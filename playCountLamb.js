// initilize
const audiosrc = [];
for (let i = 1; i <= 10; i++) {
  audiosrc.push(i.toString());
}
["100", "1000", "10000", "hiki", "biki", "piki", "hitsujiga"].forEach(s => audiosrc.push(s));
const audios = {};
for (const a of audiosrc) {
  const audio = new Audio();
  audio.src = `audio/${a}.mp3`;
  audio.onerror = () => {
    audio.src = `https://codeforkosen.github.io/lambcounter/audio/${a}.mp3`;
  };
  audios[a] = audio;
}
await Promise.all(Object.values(audios));
btn.disabled = false;

// util
export const sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));

export const playSync = async (s, cutms = 60) => {
  const a = audios[s.toString()];
  a.play();
  await sleep(a.duration * 1000 - cutms);
};

// counter
const hbp = ["hiki", "biki", "piki"];
const hbpiki = [-1, 2, 0, 1, 0, 0, 2, 0, 0, 0, 2];
export const playCountLamb = async (n) => {
  await playSync("hitsujiga");
  if (n > 99999 || n < 1) {
    throw new Error("out of bounds! must be 1 - 99999");
  }
  let last = 0;
  for (let i = 10000; i >= 10; i /= 10) {
    if (n >= i) {
      const m = Math.floor(n / i % 10);
      if (m > 0) {
        if (m > 1 || i == 10000) {
          await playSync(m);
        }
        await playSync(i);
        last = i;
      }
    }
  }
  const m = n % 10;
  if (m == 0) {
    await playSync(last == 10 ? "piki" : last == 100 ? "hiki" : "biki");
  } else {
    await playSync(m);
    await playSync(hbp[hbpiki[m]])
  }
};
