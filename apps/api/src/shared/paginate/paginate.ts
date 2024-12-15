import { ObjectLiteral } from 'typeorm';
import { Paginate as PaginateParameters } from '@repo/business/api/interface';

export class Paginate<T extends ObjectLiteral>
  implements PaginateParameters<T>
{
  skip: number = 0;
  next: number = 0;
  prev: number = 0;
  total: number = 0;
  pages: number = 0;
  results: Array<T> = [];
  per_page: number = 0;
  current_page: number = 0;

  constructor(page: number, limit: number, total: number, results: Array<T>) {
    this.insertCurrentPageNumberIntoPagination(page);
    limit = this.calculateLimit(limit);
    this.insertTotalNumberOfPagesIntoPagination(total, limit);
    this.insertSkipIntoPagination(limit);
    this.insertNumberOfNextPageIntoPagination();
    this.insertNumberOfPreviousPageIntoPagination();
    this.insertTotalNumberOfItemsIntoPagination(total);
    this.insertTotalNumberOfItemsPerPageIntoPagination(limit);
    this.insertResultsIntoPagination(results);
  }

  private insertCurrentPageNumberIntoPagination(page: number) {
    page = page < 1 ? 1 : page;
    this.current_page = page === 0 ? 1 : Number(page);
  }

  private calculateLimit(limit: number) {
    return limit > 100 ? 100 : limit;
  }

  private insertTotalNumberOfPagesIntoPagination(total: number, limit: number) {
    this.pages = Math.ceil(total / Number(limit));
  }

  private insertSkipIntoPagination(limit: number) {
    if (this.current_page === 1) {
      this.skip = 0;
    }

    if (this.current_page === 2) {
      this.skip = limit;
    }

    this.skip = this.current_page * limit - limit;
  }

  private insertNumberOfNextPageIntoPagination() {
    this.next = this.current_page === this.pages ? 0 : this.current_page + 1;
  }

  private insertNumberOfPreviousPageIntoPagination() {
    this.prev = this.current_page === 1 ? 0 : this.current_page - 1;
  }

  private insertTotalNumberOfItemsIntoPagination(total: number) {
    this.total = total;
  }

  private insertTotalNumberOfItemsPerPageIntoPagination(limit: number) {
    this.per_page = limit === 0 ? this.total : limit;
  }

  private insertResultsIntoPagination(results: Array<T>) {
    this.results = results;
  }
}