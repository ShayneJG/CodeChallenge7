import { HeaderProps } from "../types/types";

export default function Header({ headerData }: { headerData: HeaderProps }) {
  const { headline, source, byline, publicationDate } = headerData;

  return (
    <header>
      <h1>{headline}</h1>
      <div>
        <p>{byline}</p>
        <p>{source}</p>
      </div>
      <p>{dateFormatter(publicationDate)}</p>
    </header>
  );

  //formats date and returns string that matches the requested design.
  function dateFormatter(dateToFormat: string) {
    const date = new Date(dateToFormat);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = date.toLocaleString("en-AU", { weekday: "short" });

    const dayOfMonth = date.getDate();

    const monthName = months[date.getMonth()];

    const year = date.getFullYear();

    // Get the hour in 12-hour format
    const hours = date.getHours() % 12 || 12;

    const minutes = date.getMinutes();

    // Determine whether it should be AM or PM
    const amPm = date.getHours() >= 12 ? "PM" : "AM";

    // Create the formatted date string
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year} ${hours}:${minutes
      .toString()
      .padStart(2, "0")}${amPm}`;

    return formattedDate;
  }
}
