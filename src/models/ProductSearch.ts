export class ProductSearch {
  public saleCategories?: number = 613;

  public channel?: string = 'pv_online';

  public terminal?: string = 'phongvu';

  public saleStatuses?: string = 'hang_ban,hang_dat_truoc,hang_sap_het,hang_moi,hang_trung_bay,hang_thanh_ly';

  // tslint:disable-next-line:variable-name
  public _sort?: string = 'saleStatuses||hang_ban|hang_dat_truoc|hang_sap_het|hang_moi||hang_trung_bay|hang_thanh_ly||ngung_kinh_doanh';

  // tslint:disable-next-line:variable-name
  public _order?: 'asc' | 'desc' = 'asc';

  // tslint:disable-next-line:variable-name
  public _page: number = 1;

  // tslint:disable-next-line:variable-name
  public _limit: number = 10;

  public q?: string;
}
