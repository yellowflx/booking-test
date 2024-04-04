import { faker } from "@faker-js/faker";
import { Room } from "./roomStore";

const mockDates = () => {
    const dates: Date[] = [];

    const randomDateInMonth = () => {
        const start = new Date();
        const end = new Date();
        end.setDate(30);

        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    };

    for (let i = 0; i < 6; i++) {
        const date = randomDateInMonth();
        if (!dates.filter((d) => d.getDate() === date.getDate()).length) {
            dates.push(date);
        }
    }
    return dates.sort((a, b) => a.getTime() - b.getTime());
};

export const mockRooms = (length: number) => {
    const rooms: Room[] = [];
    for (let i = 0; i < length; i++) {
        rooms.push({
            id: i,
            name: `Room ${i + 1}`,
            imgs: [
                faker.image.urlLoremFlickr({ category: "urban" }),
                faker.image.urlLoremFlickr({ category: "urban" }),
                faker.image.urlLoremFlickr({ category: "urban" }),
            ],
            price: Math.floor(Math.random() * 100) + 50,
            capacity: Math.floor(Math.random() * 5) + 1,
            availableDates: mockDates(),
        });
    }
    return rooms;
};
