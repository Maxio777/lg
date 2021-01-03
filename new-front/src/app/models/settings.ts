export class Settings {
  currentTournamentId: string;
  formats: string[];

  private constructor(settings) {
    this.currentTournamentId = settings.currentTournamentId || null;
    this.formats = settings.formats || [];
  }

  static fromJS(settings: any): Settings | null {
    if (settings) {
      return new Settings(settings);
    } else {
      return null;
    }
  }
}
