import { ServiceCard } from '../../patterns/PatternServiceCard';
import { insightsCards, detectionCards, detectionCardsRow2, ServiceCard as ServiceCardData } from './data';

export default function PageContent() {
  return (
    <div className="monitor-content-inner">
      {/* ─── Insights ─── */}
      <div className="monitor-section">
        <h2>Insights</h2>
        <p>
          Use curated monitoring views for specific Azure resources.{' '}
          <a href="#">View all insights</a>
        </p>
        <div className="monitor-card-grid">
          {insightsCards.map((card) => (
            <ServiceCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
          ))}
        </div>
      </div>

      {/* ─── Detection, triage, and diagnosis ─── */}
      <div className="monitor-section">
        <h2>Detection, triage, and diagnosis</h2>
        <p>
          Visualize, analyze, and respond to monitoring data and events.{' '}
          <a href="#">Learn more about monitoring ↗</a>
        </p>
        <div className="monitor-card-grid">
          {detectionCards.map((card) => (
            <ServiceCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
          ))}
        </div>
        <div className="monitor-card-grid" style={{ marginTop: 12 }}>
          {detectionCardsRow2.map((card) => (
            <ServiceCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
