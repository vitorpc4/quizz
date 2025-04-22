// Este componente existes para resolver uma situação relacionado ao suppressHydrationWarning
// que ocorre quando o componente é renderizado no lado do servidor e depois no lado do cliente
// Para mais informações, consulte: https://nextjs.org/docs/messages/react-hydration-error

export default function FormatDate({ date }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return <>{formatDate(date)}</>;
}
