export const ServerRow = ({ nombre, direccionIP, SO, motorBase }) => {
  return (
    <tr>
      <td className="text-center">{nombre}</td>
      <td className="text-center">{direccionIP}</td>
      <td className="text-center">{SO}</td>
      <td className="text-center">{motorBase}</td>
    </tr>
  );
};
