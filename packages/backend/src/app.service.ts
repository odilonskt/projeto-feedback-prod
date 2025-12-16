import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
@Injectable()
export class AppService {
  getProcessedData() {
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    return _.uniqBy(data, 'id');
  }
}
