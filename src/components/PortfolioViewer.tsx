import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { PORTFOLIO_TEMPLATES, TemplateKey } from '@/components/portfolioTemplates';
import { Loader } from '@/components/ui/loader';
import { Client, Databases } from 'appwrite';
import { DATABASE_ID, TABLE_PORTFOLIOS } from '@/constants/appwrite';

// Create databases instance
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

const PortfolioViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<PortfolioFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!id) {
        setError('Portfolio ID is required');
        setLoading(false);
        return;
      }

      try {
        // Using the correct Appwrite SDK
        const response = await databases.getDocument(
          DATABASE_ID,
          TABLE_PORTFOLIOS,
          id
        );
        setPortfolio(response as unknown as PortfolioFormData);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Portfolio not found or error loading portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Not Found</h1>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No portfolio data available</p>
      </div>
    );
  }

  // Get the selected template or default to modern
  const templateKey = (portfolio.selectedTemplate as TemplateKey) || 'modern';
  const TemplateComponent = PORTFOLIO_TEMPLATES[templateKey] || PORTFOLIO_TEMPLATES.modern;

  return <TemplateComponent data={portfolio} />;
};

export default PortfolioViewer;
