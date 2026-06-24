import Sound from "react-native-sound";

Sound.setCategory("Playback");

export const playBeep = () => {
  const sound = new Sound(
    "beep.mp3",
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log(error);
        return;
      }

      sound.play(() => {
        sound.release();
      });
    }
  );
};