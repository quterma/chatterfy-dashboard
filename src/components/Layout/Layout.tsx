import { Filters } from '../Filters/Filters';
import { Graph } from '../Graph/Graph';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-[200px]">
      <header className="bg-gray-100 p-4 shadow-md text-center sm:text-left">
        <div className="flex flex-col sm:items-center items-start">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate sm:whitespace-normal">
            Chatterfy <span className="sm:inline hidden">Usage Analytics</span>
          </h1>
          <p className="text-gray-600 mt-2 sm:text-sm lg:text-base hidden sm:block">
            Analyze usage costs and trends
          </p>
        </div>
      </header>

      <main className="flex-1 p-1 sm:p-4 grid gap-4 md:grid-cols-4">
        <aside
          className="col-span-full md:col-span-1 bg-gray-50 p-4 rounded shadow min-w-[200px]"
          data-testid="filters"
        >
          <Filters />
        </aside>
        <section
          className="col-span-full md:col-span-3 bg-white p-4 rounded shadow min-h-[300px]"
          data-testid="graph"
        >
          <Graph />
        </section>
      </main>

      <footer className="bg-gray-100 text-center py-2 text-sm text-gray-600 border-t min-w-[200px]">
        <p>
          © 2024 Daniel Shapiro.{' '}
          <a
            href="https://github.com/quterma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};
