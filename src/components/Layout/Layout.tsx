import { FiltersComponent } from '../FiltersComponent/FiltersComponent';
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

      <main className="flex flex-1 p-4 flex-col md:flex-row gap-4">
        <aside className="flex-shrink-0 md:w-1/4 bg-gray-50 p-4 rounded shadow min-w-[200px]">
          <FiltersComponent />
        </aside>

        <section className="flex-1 bg-white p-4 rounded shadow min-h-[300px]">
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
