class Event {
    constructor(type, data) {
      this.type = type;
      this.data = data;
      Object.freeze(this);
    }
} 
export default Event;
