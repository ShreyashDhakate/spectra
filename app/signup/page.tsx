
import '../globals.css';
import Signup from '@/app/components/Signup';
import NotificationProvider from "@/app/components/NotificationProvider";
const App = () => {
  return (
<div>
      
      <NotificationProvider />
      <Signup />
      </div>
  );
};

export default App;