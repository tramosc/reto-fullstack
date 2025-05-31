// app/page.tsx
export default function HomePage() {
  return (
<div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md text-center">
  <h1 className="text-3xl font-bold mb-4 text-gray-800">Bienvenido al proyecto FullStack</h1>
  <p className="text-gray-600">
    Ve a{" "}
    <a
      href="/login"
      className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
    >
      Login
    </a>
  </p>
</div>
  );
}
