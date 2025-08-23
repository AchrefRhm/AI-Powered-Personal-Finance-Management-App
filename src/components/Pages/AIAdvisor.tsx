import React, { useState, useEffect } from 'react';
import { AIInsight } from '../../types';
import { aiApi } from '../../utils/api';
import { LoadingSpinner } from '../LoadingSpinner';
import { Brain, MessageCircle, TrendingUp, Target, DollarSign, Send } from 'lucide-react';

export const AIAdvisor: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; message: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const data = await aiApi.getInsights();
      setInsights(data);
    } catch (error) {
      console.error('Error loading AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setIsGenerating(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      const aiResponse = generateAIResponse(userMessage);
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAIResponse = (message: string): string => {
    const responses = [
      "Based on your spending patterns, I recommend allocating 20% more to your savings account and reducing dining expenses by 15%.",
      "Your investment portfolio shows good diversification. Consider adding some international ETFs for better risk management.",
      "I notice you're consistently under budget in transportation. You could redirect that surplus towards your emergency fund.",
      "Your financial health score could improve by paying down high-interest debt first, then increasing investment contributions.",
      "Consider setting up automated transfers to reach your savings goals faster. Even $100 weekly can make a significant difference.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'spending': return DollarSign;
      case 'saving': return Target;
      case 'investment': return TrendingUp;
      default: return Brain;
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Financial Advisor</h1>
            <p className="text-gray-600 mt-2">Get personalized insights and recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Insights</h3>
          <div className="space-y-4">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div key={insight.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 mt-1 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-700">{insight.message}</p>
                      {insight.action && (
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-2">
                          {insight.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Chat */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-96">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Chat with AI</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatHistory.length === 0 && (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Ask me anything about your finances!</p>
              </div>
            )}
            
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  chat.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {chat.message}
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about budgeting, investing, or saving..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGenerating}
            />
            <button
              onClick={handleSendMessage}
              disabled={isGenerating || !chatMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Tips for Financial Success</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-800 mb-1">Automate Savings</h4>
            <p className="text-sm text-green-700">Set up automatic transfers to build wealth effortlessly</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-800 mb-1">Diversify Investments</h4>
            <p className="text-sm text-blue-700">Spread risk across different asset classes and markets</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-800 mb-1">Track Spending</h4>
            <p className="text-sm text-purple-700">Monitor expenses to identify saving opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};