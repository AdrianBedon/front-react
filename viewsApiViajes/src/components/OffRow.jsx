export const OffRow = ({ creation_date, amount, namePackage, total }) => {
  return (
    <tr>
      <td className="text-center">{namePackage}</td>
      <td className="text-center">{creation_date}</td>
      <td className="text-center">{amount}</td>
      <td className="text-center">{total}</td>
    </tr>
  );
};