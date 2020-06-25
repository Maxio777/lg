// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { map } from 'rxjs/operators';
// import { Observable, of as observableOf, merge } from 'rxjs';
// import { DataService, Tournament } from "../data.service";
//
// export interface Tournament {
//   id: number; /*id турнира*/
//   teamName: string;
//   gamesCount: number;
//   win: number;
//   draw: number;
//   loss: number;
//   points: number;
//   goals: number;
//   missedGoals: number;
//   goalDifference: number;
// }
//
// export class UserTableTwoDataSource extends DataSource<Tournament> {
//   data: Tournament[] = this._data.tournament;
//
//   constructor(private paginator: MatPaginator, private sort: MatSort, private _data: DataService) {
//     super();
//     console.log('this._data.tournament', this._data.tournament);
//   }
//
//   connect(): Observable<Tournament[]> {
//     const dataMutations = [
//       observableOf(this.data),
//       this.paginator.page,
//       this.sort.sortChange
//     ];
//
//     this.paginator.length = this.data.length;
//
//     return merge(...dataMutations).pipe(map(() => {
//       return this.getPagedData(this.getSortedData([...this.data]));
//     }));
//   }
//
//   disconnect() {}
//   private getPagedData(data: Tournament[]) {
//     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//     return data.splice(startIndex, this.paginator.pageSize);
//   }
//
//   private getSortedData(data: Tournament[]) {
//     if (!this.sort.active || this.sort.direction === '') {
//       return data;
//     }
//
//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === 'asc';
//       switch (this.sort.active) {
//         case 'teamName': return compare(a.teamName, b.teamName, isAsc);
//         case 'id': return compare(+a.id, +b.id, isAsc);
//         case 'gamesCount': return compare(+a.gamesCount, +b.gamesCount, isAsc);
//         case 'win': return compare(+a.win, +b.win, isAsc);
//         case 'loss': return compare(+a.loss, +b.loss, isAsc);
//         case 'draw': return compare(+a.draw, +b.draw, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }
//
// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a, b, isAsc) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
