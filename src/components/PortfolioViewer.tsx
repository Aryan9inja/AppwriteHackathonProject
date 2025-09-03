import React, { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PortfolioFormData } from "@/schemas/portfolio.schema";
import {
  PORTFOLIO_TEMPLATES,
  TemplateKey,
} from "@/components/portfolioTemplates";
import { Loader } from "@/components/ui/loader";
import { fetchPortfolio } from "@/services/portfolio.services";

const PortfolioViewer: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<PortfolioFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setData = async () => {
      setLoading(true);
      if (!id) {
        setError("Provide an ID in params");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchPortfolio(id);
        setPortfolio(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Error fetching portfolio");
      } finally {
        setLoading(false);
      }
    };
    setData();
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
        <h1 className="text-2xl font-bold text-gray-900">
          Portfolio Not Found
        </h1>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => navigate("/")}
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

  const templateKey = (portfolio.selectedTemplate as TemplateKey) || "modern";
  const TemplateComponent =
    PORTFOLIO_TEMPLATES[templateKey] || PORTFOLIO_TEMPLATES.modern;

  return <TemplateComponent data={portfolio} />;
});

PortfolioViewer.displayName = "PortfolioViewer"; // For debugging
export default PortfolioViewer;
