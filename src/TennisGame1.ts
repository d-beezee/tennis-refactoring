import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.m_score1 += 1;
    else this.m_score2 += 1;
  }

  getScore(): string {
    if (this.isTie()) return this.getTieScore();
    if (this.isWin()) return this.getWinScore();
    if (this.isAdvantage()) return this.getAdvantageScore();
    if (!this.isTie() && !this.isWinStage()) return this.getStandardScore();

    throw new Error("Invalid situation");
  }

  private getStandardScore() {
    return `${this.getScoreValue(this.m_score1)}-${this.getScoreValue(
      this.m_score2
    )}`;
  }

  private getScoreValue(score: number) {
    if (score === 0) return "Love";
    if (score === 1) return "Fifteen";
    if (score === 2) return "Thirty";
    if (score === 3) return "Forty";
    throw new Error(`Invalid score value: ${score}`);
  }

  private getWinScore(): string {
    return `Win for ${this.m_score1 > this.m_score2 ? "player1" : "player2"}`;
  }

  private getAdvantageScore(): string {
    return `Advantage ${this.m_score1 > this.m_score2 ? "player1" : "player2"}`;
  }

  private getTieScore() {
    if (this.m_score1 > 2) return "Deuce";
    return `${this.getScoreValue(this.m_score1)}-All`;
  }

  private isTie() {
    return this.m_score1 === this.m_score2;
  }

  private isWin() {
    return this.isWinStage() && !this.isAdvantage();
  }

  private isAdvantage() {
    return this.isWinStage() && Math.abs(this.m_score1 - this.m_score2) === 1;
  }

  private isWinStage() {
    return (this.m_score1 >= 4 || this.m_score2 >= 4) && !this.isTie();
  }
}
