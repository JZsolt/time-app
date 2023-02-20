export interface IMember {
  id: number;
  attributes: {
    firstName: string;
    lastName: string;
    clmChairman: boolean;
    talk: boolean;
    spiritualGems: boolean;
    bReading: boolean;
    conversation: boolean;
    smallTalk: boolean;
    livingAsCh: boolean;
    bibleStudy: boolean;
  };
}
