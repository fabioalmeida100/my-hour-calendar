import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  private events = [
    {
      "id": 1,
      "description": "Tarefa 1",
      "startDate": "2023-06-28T01:47",
      "endDate": "2023-06-28T03:47",
      "checked": false
    },
    {
      "id": 2,
      "description": "Tarefa 2",
      "startDate": "2023-06-28T01:51",
      "endDate": "2023-06-28T02:51",
      "checked": false
    },
    {
      "id": 3,
      "description": "Tarefa 3",
      "startDate": "2023-06-29T01:54",
      "endDate": "2023-06-29T10:54",
      "checked": false
    }
  ]


  getEvents(): Array<any> {
    return this.events;
  }

  create(event: any) {
    const eventToSave = {
      ...event,
      id: this.events.length + 1,
    }
    this.events.push(eventToSave);
  }

  delete(id: number) {
    const index = this.events.findIndex(event => event.id == id);
    this.events.splice(index, 1);
  }
}
