import { DatePicker, Form, InputNumber, Modal } from "antd";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import roomStore from "../store/roomStore";

const { RangePicker } = DatePicker;

const RoomFilterModal = observer(() => {
    const { filterModal } = roomStore;

    const [form] = Form.useForm();

    const handleFilter = () => {
        form.validateFields().then((values) => {
            if (values.dateRange) {
                values.dateRange = {
                    start: dayjs(values.dateRange[0]).toDate(),
                    end: dayjs(values.dateRange[1]).toDate(),
                };
            }
            roomStore.applyFilters(values);
            filterModal.hide();
        });
    };

    return (
        <Modal
            title="Filter Rooms"
            open={filterModal.showModal}
            onCancel={filterModal.hide}
            onOk={handleFilter}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="price" label="Price per day">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="capacity" label="Capacity">
                    <InputNumber min={1} max={5} />
                </Form.Item>
                <Form.Item name="dateRange" label="Date Range">
                    <RangePicker minDate={dayjs()} />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default RoomFilterModal;
