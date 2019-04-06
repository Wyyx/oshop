import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({ name: 'myDate' })
export class MyDate implements PipeTransform {
  transform(value: number): string {
    const date = moment()
      .milliseconds(value)
      .format('dddd, MMMM Do YYYY, h:mm:ss a')
    return date
  }
}
