import React, { useState } from 'react';
import {
  Crown, Sparkles, CheckCircle2, Shield, Star, Car, Calendar,
  Clock, MapPin, Users, ArrowRight, Layers, Palette, Type, Sliders, Eye
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { SectionHeader } from '../common/SectionHeader';
import { Input } from '../common/Input';

export const DesignSystemShowcase = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{ paddingBottom: '96px' }}>
      {/* Hero Header for Design System */}
      <section style={{
        position: 'relative',
        paddingTop: '64px',
        paddingBottom: '64px',
        background: 'linear-gradient(180deg, rgba(248,249,250,1) 0%, rgba(240,243,246,0.6) 100%)',
        borderBottom: '1px solid rgba(200, 205, 215, 0.3)'
      }}>
        <div className="container">
          <SectionHeader
            badge="Master Build Process — Step 1"
            badgeIcon={Crown}
            title="Luxury Mobility Design System &"
            titleHighlight="Brand Foundation"
            description="Established for Siddhu Car Rentals — Bengaluru's premier executive chauffeur and luxury mobility service. Built with pearl translucency, deep charcoal editorial typography, frosted glassmorphism, and gold accents."
            align="center"
          />

          {/* Quick Showcase Navigation Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
            {[
              { id: 'all', label: 'Complete System', icon: Layers },
              { id: 'tokens', label: '1. Colors & Tokens', icon: Palette },
              { id: 'typography', label: '2. Editorial Typography', icon: Type },
              { id: 'glass', label: '3. Glassmorphism & Cards', icon: Eye },
              { id: 'components', label: '4. Buttons & Controls', icon: Sliders },
              { id: 'vehicles', label: '5. Vehicle & Media Showcase', icon: Car },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn btn-pill ${isActive ? 'btn-gold' : 'btn-glass'}`}
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '48px' }}>
        {/* TAB 1: COLOR & BRAND TOKENS */}
        {(activeTab === 'all' || activeTab === 'tokens') && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Badge variant="gold" icon={Palette}>Token Specification 01 & 05</Badge>
              <h3 className="text-h2" style={{ marginTop: '8px' }}>Color Palette & Border Tokens</h3>
              <p className="text-subtitle">Pearl foundation, deep charcoal hierarchy, champagne gold accents, and fine 1px glass borders.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {/* Token Card: Pearl Foundation */}
              <GlassCard variant="standard">
                <div style={{ height: '70px', background: '#F8F9FA', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '12px' }} />
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Pearl Foundation</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>#F8F9FA / --bg-foundation</div>
                <div style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--color-charcoal-600)' }}>Base canvas backdrop</div>
              </GlassCard>

              {/* Token Card: Deep Charcoal */}
              <GlassCard variant="standard">
                <div style={{ height: '70px', background: '#12151C', borderRadius: '8px', marginBottom: '12px' }} />
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Deep Charcoal 900</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>#12151C / --color-charcoal-900</div>
                <div style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--color-charcoal-600)' }}>Headline typography & dark cards</div>
              </GlassCard>

              {/* Token Card: Champagne Gold */}
              <GlassCard variant="glowing">
                <div style={{ height: '70px', background: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)', borderRadius: '8px', marginBottom: '12px' }} />
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Champagne Gold Accent</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-primary)' }}>#C5A059 / --accent-gold-primary</div>
                <div style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--color-charcoal-600)' }}>Primary luxury accent & badges</div>
              </GlassCard>

              {/* Token Card: Translucent Glass */}
              <GlassCard variant="interactive">
                <div style={{ height: '70px', background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(16px)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.9)', marginBottom: '12px' }} />
                <div style={{ fontWeight: '700', color: 'var(--color-charcoal-900)' }}>Frosted Translucent Glass</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>rgba(255,255,255,0.72) + 16px Blur</div>
                <div style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--color-charcoal-600)' }}>Floating cards, headers, panels</div>
              </GlassCard>
            </div>
          </section>
        )}

        {/* TAB 2: EDITORIAL TYPOGRAPHY */}
        {(activeTab === 'all' || activeTab === 'typography') && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Badge variant="gold" icon={Type}>Typography Hierarchy 01</Badge>
              <h3 className="text-h2" style={{ marginTop: '8px' }}>Editorial & UI Typography Scale</h3>
              <p className="text-subtitle">Pairing Google Playfair Display (Serif Headlines) with Plus Jakarta Sans (UI Logic).</p>
            </div>

            <GlassCard variant="standard" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px' }}>
                <div className="text-caption" style={{ marginBottom: '4px' }}>Display Headline — Playfair Display 600 (3.5rem / 4.25rem)</div>
                <h1 className="text-display">Redefining Luxury Mobility in Bengaluru.</h1>
              </div>

              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px' }}>
                <div className="text-caption" style={{ marginBottom: '4px' }}>H1 Section Heading — Playfair Display Bold (2.75rem)</div>
                <h2 className="text-h1">Executive Chauffeur Fleet & Airport Transfers</h2>
              </div>

              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px' }}>
                <div className="text-caption" style={{ marginBottom: '4px' }}>H2 Card Heading — Playfair Display (2.25rem)</div>
                <h3 className="text-h2">Mercedes-Benz S-Class Executive Sedan</h3>
              </div>

              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px' }}>
                <div className="text-caption" style={{ marginBottom: '4px' }}>H3 Subhead — Plus Jakarta Sans Semibold (1.5rem)</div>
                <h4 className="text-h3">Pristine Fleet Condition & Uncompromising Punctuality</h4>
              </div>

              <div>
                <div className="text-caption" style={{ marginBottom: '4px' }}>Body Regular & Small Text — Plus Jakarta Sans (16px / 14px)</div>
                <p className="text-body" style={{ marginBottom: '8px' }}>
                  Every journey with Siddhu Car Rentals is curated to provide seamless comfort. From airport pick-ups at Kempegowda International Airport to corporate delegations in Manyata Tech Park and UB City.
                </p>
                <p className="text-small">
                  Small label note: Vehicles sanitised before every assignment. Uniformed, English-speaking chauffeurs guaranteed.
                </p>
              </div>
            </GlassCard>
          </section>
        )}

        {/* TAB 3: GLASSMORPHISM & CARDS */}
        {(activeTab === 'all' || activeTab === 'glass') && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Badge variant="gold" icon={Eye}>Glass System 04 & 06</Badge>
              <h3 className="text-h2" style={{ marginTop: '8px' }}>Frosted Glass Card Architecture</h3>
              <p className="text-subtitle">Translucent surfaces with soft elevation shadows, subtle light borders, and micro-interactions.</p>
            </div>

            <div className="grid-showcase">
              {/* Standard Glass Card */}
              <GlassCard variant="standard">
                <Badge variant="gold" icon={Shield} style={{ marginBottom: '16px' }}>Standard Glass</Badge>
                <h4 className="text-h3" style={{ marginBottom: '8px' }}>Corporate Fleet Access</h4>
                <p className="text-small" style={{ marginBottom: '16px' }}>
                  Dedicated luxury mobility solutions for corporate executives, tech founders, and board members across Bengaluru.
                </p>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-gold-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Learn Corporate Terms</span> <ArrowRight size={14} />
                </div>
              </GlassCard>

              {/* Interactive Hover Card */}
              <GlassCard variant="interactive">
                <Badge variant="glass" icon={Sparkles} style={{ marginBottom: '16px' }}>Interactive Hover</Badge>
                <h4 className="text-h3" style={{ marginBottom: '8px' }}>Hourly VIP Chauffeur</h4>
                <p className="text-small" style={{ marginBottom: '16px' }}>
                  Hover over this card to observe the smooth 4px lift transition, gold border highlight, and soft ambient glow.
                </p>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-gold-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>View Hourly Packages</span> <ArrowRight size={14} />
                </div>
              </GlassCard>

              {/* Glowing Luxury Border Card */}
              <GlassCard variant="glowing">
                <Badge variant="gold" icon={Crown} style={{ marginBottom: '16px' }}>Glowing Border</Badge>
                <h4 className="text-h3" style={{ marginBottom: '8px' }}>Diplomatic & Wedding Convoy</h4>
                <p className="text-small" style={{ marginBottom: '16px' }}>
                  Matching luxury white Mercedes & Audi fleets decorated for high-profile weddings and diplomatic visits.
                </p>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-gold-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Reserve Wedding Convoy</span> <ArrowRight size={14} />
                </div>
              </GlassCard>

              {/* Dark Executive Card */}
              <GlassCard variant="dark">
                <Badge variant="dark" icon={Star} style={{ marginBottom: '16px' }}>Dark Executive</Badge>
                <h4 className="text-h3" style={{ color: '#FFFFFF', marginBottom: '8px' }}>Kempegowda Airport VIP</h4>
                <p className="text-small" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                  24/7 flight tracking, terminal flight gate greeting, luggage assistance, and express highway transit.
                </p>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#C5A059', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Book Airport Transfer</span> <ArrowRight size={14} />
                </div>
              </GlassCard>
            </div>
          </section>
        )}

        {/* TAB 4: BUTTONS & FORM CONTROLS */}
        {(activeTab === 'all' || activeTab === 'components') && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Badge variant="gold" icon={Sliders}>Controls System 03 & 09</Badge>
              <h3 className="text-h2" style={{ marginTop: '8px' }}>Button & Form Control System</h3>
              <p className="text-subtitle">Precision button variants, pill tags, and glassmorphic form input elements.</p>
            </div>

            {/* Button Gallery */}
            <GlassCard variant="standard" style={{ marginBottom: '32px' }}>
              <h4 className="text-h4" style={{ marginBottom: '16px' }}>Button Variants & Sizes</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <Button variant="gold" icon={Crown}>Primary Gold Button</Button>
                <Button variant="glass" icon={Sparkles}>Glass Luxury Button</Button>
                <Button variant="dark" icon={Car}>Dark Executive Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                <Button variant="gold" size="lg" pill icon={ArrowRight} iconPosition="right">Large Pill Button</Button>
                <Button variant="gold" size="md" pill>Standard Pill</Button>
                <Button variant="gold" size="sm" pill>Small Pill</Button>
              </div>
            </GlassCard>

            {/* Form Controls */}
            <GlassCard variant="standard">
              <h4 className="text-h4" style={{ marginBottom: '20px' }}>Glass Form Inputs & Dropdowns</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <Input
                  label="Pickup Location"
                  icon={MapPin}
                  placeholder="e.g. UB City, Bengaluru"
                />
                <Input
                  label="Select Mobility Package"
                  icon={Car}
                  options={[
                    { value: 'airport', label: 'Kempegowda Airport VIP Transfer' },
                    { value: 'local_8h', label: 'Local Hourly (8 Hours / 80 Kms)' },
                    { value: 'outstation', label: 'Intercity Outstation Journey' },
                    { value: 'wedding', label: 'Wedding & Ceremonial Convoy' }
                  ]}
                />
                <Input
                  label="Travel Date"
                  type="date"
                  icon={Calendar}
                />
                <Input
                  label="Preferred Vehicle Class"
                  icon={Users}
                  options={[
                    { value: 'mercedes', label: 'Mercedes-Benz S-Class (VIP Luxury)' },
                    { value: 'bmw', label: 'BMW 5 Series (Executive Sedan)' },
                    { value: 'innova', label: 'Toyota Innova Crysta (7-Seater VIP)' },
                    { value: 'fortuner', label: 'Toyota Fortuner Legender (SUV)' }
                  ]}
                />
              </div>
            </GlassCard>
          </section>
        )}

        {/* TAB 5: VEHICLE & MEDIA SHOWCASE */}
        {(activeTab === 'all' || activeTab === 'vehicles') && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Badge variant="gold" icon={Car}>Imagery System 12</Badge>
              <h3 className="text-h2" style={{ marginTop: '8px' }}>Bespoke Automotive Imagery</h3>
              <p className="text-subtitle">High-resolution realistic vehicle photography in realistic Bengaluru context. Zero stock placeholders.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Vehicle 1: Mercedes S-Class */}
              <GlassCard variant="interactive">
                <div className="img-ratio-16-9" style={{ marginBottom: '16px' }}>
                  <img src="/images/hero_luxury_sedan.jpg" alt="Mercedes S-Class Bengaluru" />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <Badge variant="dark">VIP Flagship</Badge>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h4 className="text-h3">Mercedes-Benz S-Class</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-500)' }}>Luxury Executive Sedan</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-gold-primary)' }}>₹4,500<span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>/hr</span></div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--color-charcoal-600)', marginTop: '12px', padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span>✓ Leather Interior</span>
                  <span>✓ Sunroof</span>
                  <span>✓ Uniformed Chauffeur</span>
                </div>
              </GlassCard>

              {/* Vehicle 2: Toyota Innova Crysta */}
              <GlassCard variant="interactive">
                <div className="img-ratio-16-9" style={{ marginBottom: '16px' }}>
                  <img src="/images/innova_crysta_luxury.jpg" alt="Toyota Innova Crysta VIP Bengaluru" />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <Badge variant="gold">Most Popular MPV</Badge>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h4 className="text-h3">Toyota Innova Crysta VIP</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-500)' }}>7-Seater Executive MPV</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-gold-primary)' }}>₹2,200<span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>/hr</span></div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--color-charcoal-600)', marginTop: '12px', padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span>✓ Captain Seats</span>
                  <span>✓ Dual AC</span>
                  <span>✓ Airport Luggage Capacity</span>
                </div>
              </GlassCard>

              {/* Vehicle 3: BMW 5 Series */}
              <GlassCard variant="interactive">
                <div className="img-ratio-16-9" style={{ marginBottom: '16px' }}>
                  <img src="/images/mercedes_e_class.jpg" alt="BMW 5 Series Executive" />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <Badge variant="glass">Corporate Choice</Badge>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h4 className="text-h3">BMW 5 Series Executive</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-500)' }}>Sport Executive Sedan</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-gold-primary)' }}>₹3,200<span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-500)' }}>/hr</span></div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--color-charcoal-600)', marginTop: '12px', padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span>✓ Harman Kardon Audio</span>
                  <span>✓ Ambient Light</span>
                  <span>✓ VIP Chauffeur</span>
                </div>
              </GlassCard>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
