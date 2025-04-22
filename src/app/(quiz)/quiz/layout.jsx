export const metadata = {
  title: 'Novo Quiz | QuizSchool',
};

export default function QuizLayout({ children }) {
  return (
    <div className="flex justify-center items-center flex-1  p-2">
      <div>{children}</div>
    </div>
  );
}
