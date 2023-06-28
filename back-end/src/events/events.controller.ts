import { Controller, Get, Post, Delete, UseGuards, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../middleware/jwt-auth-guard';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getEvents(): Array<any> {
    return this.eventsService.getEvents();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createEvent(@Body() event: any) {
    this.eventsService.create(event);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteEvent(@Param('id') id: number) {
    this.eventsService.delete(id);
  }
}
