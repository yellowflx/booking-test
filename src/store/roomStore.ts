import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { mockRooms } from "./mocks";

export interface Room {
    id: number;
    imgs: string[];
    name: string;
    price: number;
    capacity: number;
    availableDates: Date[];
}

export interface Filters {
    price?: number;
    capacity?: number;
    dateRange?: { start: Date; end: Date };
}

interface BookingDetails {
    name?: string;
    roomID: number | null;
    phone?: string;
    email?: string;
    period?: { start?: Date; end?: Date };
}

interface ModalState {
    showModal: boolean;
    toggle: () => void;
    hide: () => void;
}

class ModalStore {
    showModal: boolean;
    toggle: () => void;
    hide: () => void;

    constructor() {
        makeAutoObservable(this);
        this.showModal = false;
        this.toggle = () => {
            this.showModal = !this.showModal;
        };
        this.hide = () => {
            this.showModal = false;
        };
    }
}

class RoomStore {
    rooms: Room[] = mockRooms(15);
    filteredRooms: Room[] = [];
    selectedRoom: Room | null = null;
    bookingDetails: BookingDetails = { roomID: null };
    filterModal: ModalState;
    bookingModal: ModalState;
    filters: Filters = {};

    constructor() {
        makeObservable(this, {
            rooms: observable,
            filteredRooms: observable,
            bookingDetails: observable,
            applyFilters: action,
            selectRoom: action,
            bookRoom: action,
            filters: observable,
        });
        this.filteredRooms = this.rooms;
        this.filterModal = new ModalStore();
        this.bookingModal = new ModalStore();
    }

    applyFilters(filters: Filters) {
        this.filters = filters;
        this.filteredRooms = this.rooms.filter((room) => {
            return (
                (!filters.price || room.price <= filters.price) &&
                (!filters.capacity || room.capacity >= filters.capacity) &&
                (!filters.dateRange ||
                    room.availableDates.some((date) => {
                        if (filters.dateRange) {
                            return (
                                filters.dateRange?.start <= date &&
                                date <= filters.dateRange?.end
                            );
                        }
                    }))
            );
        });
    }

    selectRoom(roomID: number, date?: Date) {
        this.selectedRoom =
            this.rooms.find((room) => room.id === roomID) || null;
        this.bookingDetails = {
            ...this.bookingDetails,
            roomID,
            period: { start: date },
        };
        this.bookingModal.showModal = true;
    }

    bookRoom(bookingDetails: BookingDetails) {
        this.bookingDetails = bookingDetails;
    }
}

const roomStore = new RoomStore();
export default roomStore;
