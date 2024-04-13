import ImgZoomy from "../components/ImgZoomy";
import { baseURLAPI } from "../config";

export default function Prueba() {
  return (
    <>
      <div>
        <ImgZoomy
          url={
            `http://${baseURLAPI}/servicios/imgservicio/65262240823a850577bfea75/1698337342906/medium`
          }
          height={500}
          width={400}
        />
      </div>
    </>
  );
}
