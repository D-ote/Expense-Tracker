import { NotifierWrapper } from "react-native-notifier";
import "./firebase";
import RootNavigation from "./navigation";

export default function App() {
  return (
    <NotifierWrapper>
      <RootNavigation />
    </NotifierWrapper>
  );
}
