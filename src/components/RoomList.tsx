import { Button, Card, Flex, Image, List } from "antd";
import { observer } from "mobx-react";
import roomStore from "../store/roomStore";

const formatDate = (date: Date) => {
    return (
        date.getDate().toString().padStart(2, "0") +
        "." +
        (date.getMonth() + 1).toString().padStart(2, "0")
    );
};

const RoomList = observer(() => {
    const { filters } = roomStore;

    const handleBook = (roomID: number, date: Date) => {
        roomStore.selectRoom(roomID, date);
    };
    return (
        <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 }}
            dataSource={roomStore.filteredRooms}
            renderItem={(room, index) => (
                <List.Item key={index}>
                    <Card
                        style={{ maxWidth: "366px" }}
                        title={room.name}
                        cover={
                            <Flex justify="center">
                                <Image.PreviewGroup items={room.imgs}>
                                    <Image
                                        placeholder={true}
                                        alt="example"
                                        src={room.imgs[0]}
                                    />
                                </Image.PreviewGroup>
                            </Flex>
                        }
                    >
                        <p>Цена за сутки: {room.price}</p>
                        <p>Вместимость: {room.capacity}</p>
                        <p>Доступные даты:</p>
                        <Flex wrap="wrap" gap="4px">
                            {room.availableDates
                                .filter((d) => {
                                    if (filters.dateRange) {
                                        return (
                                            d.getTime() >=
                                                filters.dateRange.start.getTime() &&
                                            d.getTime() <=
                                                filters.dateRange.end.getTime()
                                        );
                                    }
                                    return true;
                                })
                                .map((date, index) => (
                                    <Button
                                        type="primary"
                                        style={{
                                            paddingInline: "7px",
                                        }}
                                        key={index}
                                        onClick={() =>
                                            handleBook(room.id, date)
                                        }
                                    >
                                        {formatDate(date)}
                                    </Button>
                                ))}
                        </Flex>
                    </Card>
                </List.Item>
            )}
        />
    );
});

export default RoomList;
