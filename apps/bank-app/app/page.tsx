import HomeComponent from "../components/Home/HomeComponent";
import HomeComponentNoPayment from "../components/Home/HomeComponentNoPayment";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Home({ searchParams }: HomeProps) {
  const values = searchParams;
  const token = values["token"] as string;
  const amount = values["amount"] as string;
  let errorMessage = "";
  if (!token || !amount) {
    errorMessage = "Invalid URL, No token or Amount Provided";
    return <HomeComponentNoPayment message={errorMessage} />;
  }

  const amountInNumber = Number(amount);
  if (isNaN(amountInNumber)) {
    errorMessage = "Invalid amount, the amount should be a given number";
    return <HomeComponentNoPayment message={errorMessage} />;
  }

  return <HomeComponent amount={amountInNumber} token={token} />;

}
// export default function Home() {
//   return <HomeComponent amount={0} token={""} />;
// }