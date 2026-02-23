export default interface IDayRecordState {
  songName: string;
  songArtist: string;
  songUrl: string;
  note: string;
  changeSongName: (name: string) => void;
  changeSongArtist: (artist: string) => void;
  changeSongUrl: (url: string) => void;
  changeNote: (note: string) => void;

  showSongSection?: boolean;
  toggleSongSection?: () => void;
}