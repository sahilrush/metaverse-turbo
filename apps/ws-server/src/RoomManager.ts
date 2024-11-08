import type { User } from "./User";
import { OutgoingMessage } from "./types";

export class RoomManager {
  private static instance: RoomManager;
  public rooms: Map<string, User[]> = new Map();

  private constructor() {
    this.rooms = new Map();
  }


  
  public static getInstance(): RoomManager {
    if (!this.instance) {
      this.instance = new RoomManager();
    }
    return this.instance;
  }

  public removeUser(user: User, spaceId: string): void {
    if (!this.rooms.has(spaceId)) {
      return;
    }
    this.rooms.set(spaceId, (this.rooms.get(spaceId)?.filter((u) => u.id !== user.id) ?? []));
  }

  public addUser(spaceId: string, user: User): void {
    if (!this.rooms.has(spaceId)) {
      this.rooms.set(spaceId, [user]);
      return;
    }
    this.rooms.set(spaceId, [...(this.rooms.get(spaceId) ?? []), user]);
  }

  public broadcast(message: OutgoingMessage, user: User, roomId: string): void {
    if (!this.rooms.has(roomId)) {
      return;
    }
    this.rooms.get(roomId)?.forEach((u) => {
      if (u.id !== user.id) {
        u.send(message);
      }
    });
  }
}