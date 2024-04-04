import { Button, Grid, Layout, Typography } from "antd";
import { observer } from "mobx-react";
import RoomBookingModal from "./components/RoomBookingModal";
import RoomFilterModal from "./components/RoomFilterModal";
import RoomList from "./components/RoomList";
import roomStore from "./store/roomStore";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = observer(() => {
    const { filterModal } = roomStore;
    const screens = Grid.useBreakpoint();

    const handleFilterModalToggle = () => {
        filterModal.toggle();
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Header
                style={{ display: "flex", alignItems: "center", gap: "32px" }}
            >
                {screens.sm ? (
                    <Title style={{ color: "white", margin: "0" }}>
                        Hotel Booking
                    </Title>
                ) : (
                    <Title style={{ color: "white", margin: "0" }}>HB</Title>
                )}

                <Button
                    type="primary"
                    onClick={handleFilterModalToggle}
                    style={{ margin: "0" }}
                >
                    Фильтр
                </Button>
            </Header>
            <Content style={{ padding: "16px", height: "100%" }}>
                <RoomList />
                <RoomFilterModal />
                <RoomBookingModal />
            </Content>
            <Footer />
        </Layout>
    );
});

export default App;
