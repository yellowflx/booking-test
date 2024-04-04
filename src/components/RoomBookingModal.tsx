import { Card, DatePicker, Form, Image, Input, Modal } from "antd";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { useEffect } from "react";
import roomStore from "../store/roomStore";

const RoomBookingModal = observer(() => {
    const { bookingModal, bookingDetails, selectedRoom } = roomStore;
    const [form] = Form.useForm();

    useEffect(() => {
        if (!bookingDetails.period) return;
        form.setFieldValue("period", [
            dayjs(bookingDetails.period?.start),
            dayjs(bookingDetails.period?.start),
        ]);
    }, [bookingDetails, form]);

    const handleBook = () => {
        form.validateFields().then((values) => {
            roomStore.bookRoom(values);
            bookingModal.hide();
        });
    };

    return (
        <Modal
            title="Book Room"
            open={bookingModal.showModal}
            onCancel={bookingModal.hide}
            onOk={handleBook}
        >
            <Form form={form} layout="vertical">
                {selectedRoom && (
                    <Card
                        cover={
                            <Image.PreviewGroup items={selectedRoom.imgs}>
                                <Image
                                    placeholder={true}
                                    alt="example"
                                    src={selectedRoom.imgs[0]}
                                />
                            </Image.PreviewGroup>
                        }
                    >
                        <Card.Meta
                            title={selectedRoom.name}
                            description={
                                <>
                                    <p>Цена за сутки: {selectedRoom.price}</p>
                                    <p>Вместимость: {selectedRoom.capacity}</p>
                                </>
                            }
                        />
                    </Card>
                )}

                <Form.Item
                    name="name"
                    label="ФИО"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите ваше ФИО!",
                        },
                    ]}
                >
                    <Input defaultValue={bookingDetails.name} />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите ваш номер телефона!",
                        },
                    ]}
                >
                    <Input defaultValue={bookingDetails.phone} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите ваш email!",
                        },
                        {
                            type: "email",
                            message: "Пожалуйста, введите корректный email!",
                        },
                    ]}
                >
                    <Input defaultValue={bookingDetails.email} />
                </Form.Item>
                <Form.Item
                    name="period"
                    label="Период проживания"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите период проживания!",
                        },
                    ]}
                >
                    <DatePicker.RangePicker
                        value={[
                            dayjs(bookingDetails.period?.start),
                            dayjs(bookingDetails.period?.end),
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default RoomBookingModal;
