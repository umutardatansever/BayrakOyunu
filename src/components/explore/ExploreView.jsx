import React, { useContext, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import Card from '../ui/Card';
import { Search } from 'lucide-react';
import { getTranslatedName } from '../../data/translations';

const ExploreView = () => {
    const { countries, lang } = useContext(GameContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('all');

    const filtered = countries.filter(c => {
        const trName = getTranslatedName(c.name.common, lang).toLowerCase();
        const matchesSearch = trName.includes(searchTerm.toLowerCase());
        const matchesRegion = region === 'all' || c.region === region;
        return matchesSearch && matchesRegion;
    });

    return (
        <div className="animate-fade-in">
            <Card style={{ marginBottom: '30px', padding: '30px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            placeholder={lang === 'tr' ? 'Ülke ara...' : 'Search country...'}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 14px 14px 46px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                borderRadius: '12px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <select 
                        value={region} 
                        onChange={e => setRegion(e.target.value)}
                        style={{
                            padding: '14px 24px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--glass-border)',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">{lang === 'tr' ? 'Tüm Bölgeler' : 'All Regions'}</option>
                        <option value="Europe">{lang === 'tr' ? 'Avrupa' : 'Europe'}</option>
                        <option value="Asia">{lang === 'tr' ? 'Asya' : 'Asia'}</option>
                        <option value="Americas">{lang === 'tr' ? 'Amerika' : 'Americas'}</option>
                        <option value="Africa">{lang === 'tr' ? 'Afrika' : 'Africa'}</option>
                        <option value="Oceania">{lang === 'tr' ? 'Okyanusya' : 'Oceania'}</option>
                    </select>
                </div>
            </Card>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '24px' 
            }}>
                {filtered.map(country => (
                    <Card key={country.cca2} hover={true} style={{ padding: '16px', textAlign: 'center' }}>
                        <img 
                            src={country.flags.png} 
                            alt={country.name.common} 
                            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
                        />
                        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>
                            {getTranslatedName(country.name.common, lang)}
                        </h3>
                    </Card>
                ))}
            </div>
            
            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                    {lang === 'tr' ? 'Sonuç bulunamadı.' : 'No results found.'}
                </div>
            )}
        </div>
    );
};

export default ExploreView;
