export class Settings {
  currentTournamentId: string;
  formats: string[];

  private constructor(settings) {
    this.currentTournamentId = settings.currentTournamentId || null;
    this.formats = settings.formats || [];
  }

  static fromJs(settings: any): Settings | null {
    if (settings) {
      return new Settings(settings);
    } else {
      return null;
    }
  }
}
