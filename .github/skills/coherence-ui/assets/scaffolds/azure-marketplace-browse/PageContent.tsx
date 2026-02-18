// @ts-nocheck
import { useState } from 'react';
import { CuiSearchBox } from '@charm-ux/cui/react';
import {
  topCategories,
  categories,
  popularServices,
  marketplaceProducts,
} from './data';

export default function PageContent() {
  const [activeCategory, setActiveCategory] = useState('get-started');

  return (
    <div className="page-body">
      {/* ─── Categories Sidebar ─── */}
      <nav className="categories-sidebar" aria-label="Resource categories">
        {topCategories.map((cat) => (
          <a
            key={cat.id}
            className={`category-link${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            role="button"
            tabIndex={0}
          >
            {cat.label}
          </a>
        ))}

        <h3 className="category-heading">Categories</h3>
        {categories.map((cat) => (
          <a
            key={cat.id}
            className={`category-link${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            role="button"
            tabIndex={0}
          >
            {cat.label}
          </a>
        ))}
      </nav>

      {/* ─── Main Content ─── */}
      <div className="content-area">
        {/* Search Row */}
        <div className="search-row">
          <CuiSearchBox hideLabel placeholder="Search services and marketplace" />
          <span className="quickstart-link">
            Getting started? <a href="javascript:;">Try our Quickstart Center</a>
          </span>
        </div>

        {/* Two-Column Layout */}
        <div className="columns-container">
          {/* Left Column — Popular Azure Services */}
          <div>
            <div className="column-header">
              <h2 className="column-title">Popular Azure services</h2>
              <a className="column-see-more" href="javascript:;">See more in All services</a>
            </div>
            <div className="service-list">
              {popularServices.map((svc) => (
                <div className="service-row" key={svc.name}>
                  <div className="service-icon">
                    <img src={svc.icon} alt="" />
                  </div>
                  <div className="service-info">
                    <span className="service-name">{svc.name}</span>
                    <div className="service-actions">
                      <a href="javascript:;">Create</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Popular Marketplace Products */}
          <div>
            <div className="column-header">
              <h2 className="column-title">Popular Marketplace products</h2>
              <a className="column-see-more" href="javascript:;">See more in Marketplace</a>
            </div>
            <div className="service-list">
              {marketplaceProducts.map((product) => (
                <div className="marketplace-row" key={product.name}>
                  <div className="marketplace-icon">
                    <img src={product.icon} alt="" />
                  </div>
                  <div className="marketplace-info">
                    <span className="marketplace-name">{product.name}</span>
                    <div className="service-actions">
                      <a href="javascript:;">Create</a>
                      <span className="separator">|</span>
                      <a href="javascript:;">Learn more</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
