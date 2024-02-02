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

    let score: string = "";
    let tempScore: number = 0;
    for (let i = 1; i < 3; i++) {
      if (i === 1) tempScore = this.m_score1;
      else {
        score += "-";
        tempScore = this.m_score2;
      }
      switch (tempScore) {
        case 0:
          score += "Love";
          break;
        case 1:
          score += "Fifteen";
          break;
        case 2:
          score += "Thirty";
          break;
        case 3:
          score += "Forty";
          break;
      }
    }
    return score;
  }

  private getWinScore(): string {
    return `Win for ${this.m_score1 > this.m_score2 ? "player1" : "player2"}`;
  }

  private getAdvantageScore(): string {
    return `Advantage ${this.m_score1 > this.m_score2 ? "player1" : "player2"}`;
  }

  private getTieScore() {
    if (this.m_score1 === 0) return "Love-All";
    if (this.m_score1 === 1) return "Fifteen-All";
    if (this.m_score1 === 2) return "Thirty-All";
    return "Deuce";
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
