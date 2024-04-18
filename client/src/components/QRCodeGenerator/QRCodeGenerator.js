 import QRCode from 'qrcode.react';
import {getToken} from "../../helpers/auth";
 import {SERVER_HOST_IP} from "../../constants/config";

const QRCodeGenerator = () => {
    const token = getToken();

    const qrData = `${SERVER_HOST_IP}/qr/verify?token=${token}`;


    return (
        <div style={{
            display:'flex',
            flexDirection: 'column',
            alignItems:'center'
        }}>
             <h2>Սկանավորեք QR կոդը</h2>
             <QRCode value={qrData} />
        </div>
    );
};

export default QRCodeGenerator;