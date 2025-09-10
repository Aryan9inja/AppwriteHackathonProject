import React, { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PortfolioFormData } from "@/schemas/portfolio.schema";
import {
  PORTFOLIO_TEMPLATES,
  TemplateKey,
} from "@/components/portfolioTemplates";
import { Loader } from "@/components/ui/loader";
import { fetchPortfolio } from "@/services/portfolio.services";
import { functions } from "@/lib/appwrite.config";
import { INCREMENT_VIEWS_FUNC } from "@/constants/appwrite";

const PortfolioViewer: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<PortfolioFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Track if component is still mounted

    const setData = async () => {
      setLoading(true);
      if (!id) {
        if (isMounted) {
          setError("Provide an ID in params");
          setLoading(false);
        }
        return;
      }
      try {
        const data = await fetchPortfolio(id);
        if (isMounted) {
          setPortfolio(data);
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching portfolio");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const incrementView = async () => {
      if (!id) return;
      try {
        await functions.createExecution({
          functionId: INCREMENT_VIEWS_FUNC,
          body: JSON.stringify({ portfolioId: id }),
        });
      } catch (err) {
        // Silently handle view increment errors
      }
    };

    const initializePortfolio = async () => {
      await setData();
      // Only increment view after successfully fetching portfolio data
      if (isMounted) {
        incrementView();
      }
    };

    initializePortfolio();

    // Cleanup function to prevent setState on unmounted component
    return () => {
      isMounted = false;
    };
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

export default PortfolioViewer;
