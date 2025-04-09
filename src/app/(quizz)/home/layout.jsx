export default function HomeLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Home Layout</h1>
      {children}
    </div>
  );
}
