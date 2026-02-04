import React, { useState, useMemo, useEffect } from 'react';
import { 
    ShoppingBag, Search, Menu, X, Zap, Flame, User, 
    Calendar, Lock, Clock, ArrowRight, Box, ShieldCheck, 
    Instagram, Twitter, Award, Plus, Edit, Trash2, LogOut, LayoutDashboard, Gift
} from 'lucide-react';

// --- DADOS INICIAIS ---
const MOCK_DROPS = [
    { id: 1, name: "Moletom Cyber Samurai", price: 349.90, category: "Moletons", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80", tag: "DROP #01", rarity: "mítico" },
    { id: 2, name: "Neon Runner 2077", price: 899.90, category: "Tênis", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80", tag: "LIMITADO", rarity: "lendário" },
    { id: 3, name: "Calça Cargo Tech", price: 289.90, category: "Calças", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80", tag: "NOVO", rarity: "comum" },
    { id: 4, name: "Camiseta Oversized Acid", price: 159.90, category: "Camisetas", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", tag: "MAIS VENDIDO", rarity: "raro" },
    { id: 5, name: "Chapéu Bucket Reflex", price: 119.90, category: "Acessórios", image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80", tag: null, rarity: "comum" },
    { id: 6, name: "Jordan High Retro", price: 1299.00, category: "Tênis", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", tag: "GRAIL", rarity: "lendário" },
    { id: 7, name: "Jaqueta Puffer Prata", price: 699.90, category: "Jaquetas", image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=800&q=80", tag: "INVERNO", rarity: "raro" },
    { id: 8, name: "Colete Utilitário Preto", price: 229.90, category: "Acessórios", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80", tag: "TECH", rarity: "raro" },
    { id: 9, name: "Shape Skate Graffiti", price: 450.00, category: "Colecionáveis", image: "https://images.unsplash.com/photo-1520045818170-820b77f40484?auto=format&fit=crop&w=800&q=80", tag: "ARTE", rarity: "épico" },
    { id: 10, name: "Máscara Pro Filter", price: 89.90, category: "Acessórios", image: "https://images.unsplash.com/photo-1585776245991-cf79dd171d82?auto=format&fit=crop&w=800&q=80", tag: "ESSENCIAL", rarity: "comum" },
];

const INITIAL_DROPS = [
    { id: 101, date: "24 NOV", title: "Projeto: CAOS", desc: "Collab exclusiva com artistas de Tóquio.", status: "CONFIRMADO" },
    { id: 102, date: "01 DEZ", title: "Inverno Neon", desc: "Jaquetas térmicas com fibra ótica.", status: "EM BREVE" },
    { id: 103, date: "15 DEZ", title: "Drop Misterioso", desc: "Ninguém sabe o que é. Apenas esteja lá.", status: "SECRETO" },
];

const INITIAL_VAULT = [
    { id: 201, name: "Supreme Brick 2016", price: "ESGOTADO", image: "https://images.unsplash.com/photo-1581084324492-c8076f13075c?auto=format&fit=crop&w=800&q=80" },
    { id: 202, name: "Yeezy Red October", price: "ESGOTADO", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80" },
    { id: 203, name: "Cinto Off-White", price: "ESGOTADO", image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80" },
];

const CATEGORIES = ["Todos", "Tênis", "Moletons", "Camisetas", "Acessórios", "Colecionáveis", "Jaquetas", "Calças"];
const RARITIES = ["comum", "raro", "épico", "lendário", "mítico"];

// --- COMPONENTES AUXILIARES ---

const Marquee = () => (
    <div className="bg-gradient-to-r from-hype-purple via-hype-pink to-hype-orange h-8 flex items-center overflow-hidden whitespace-nowrap relative z-50 select-none">
        <div className="animate-marquee flex gap-12 text-xs font-black text-black uppercase tracking-[0.2em] w-full italic">
            <span>🔥 Drop Exclusivo Cyber-Semana</span>
            <span>⚡ Frete Grátis Global</span>
            <span>🚀 Aceitamos Cripto</span>
            <span>💎 Verificado HypeDrop</span>
            <span>🔥 Drop Exclusivo Cyber-Semana</span>
            <span>⚡ Frete Grátis Global</span>
            <span>🚀 Aceitamos Cripto</span>
        </div>
    </div>
);

const PredictiveSearch = ({ products, onSearch }) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filtered = useMemo(() => {
        if (!query) return [];
        return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
    }, [query, products]);

    return (
        <div className="relative w-full max-w-xs md:max-w-md mx-auto group z-50">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Buscar no sistema..." 
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-hype-pink focus:bg-black transition-all text-white placeholder-gray-500 font-mono"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-hype-pink transition-colors" />
            </div>
            {isOpen && query && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-hype-card border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-slide-up backdrop-blur-xl">
                    {filtered.length > 0 ? (
                        <ul>
                            {filtered.map(p => (
                                <li key={p.id} onClick={() => {onSearch(p.name); setIsOpen(false); setQuery(p.name);}} className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-0">
                                    <img src={p.image} className="w-10 h-10 rounded-md object-cover" alt={p.name} />
                                    <div>
                                        <p className="text-sm font-bold text-white">{p.name}</p>
                                        <p className="text-[10px] text-hype-purple uppercase">{p.category}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm font-mono">ERRO DO SISTEMA: Item não encontrado.</div>
                    )}
                </div>
            )}
        </div>
    );
};

const DropCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({ h: 48, m: 12, s: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s > 0) return { ...prev, s: prev.s - 1 };
                if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
                if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex gap-4 font-mono text-4xl md:text-6xl font-black text-white tracking-tighter">
            <div className="flex flex-col items-center"><span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">{timeLeft.h.toString().padStart(2, '0')}</span><span className="text-xs text-gray-500 font-sans tracking-widest">HORAS</span></div>
            <span className="text-hype-pink animate-pulse">:</span>
            <div className="flex flex-col items-center"><span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">{timeLeft.m.toString().padStart(2, '0')}</span><span className="text-xs text-gray-500 font-sans tracking-widest">MINS</span></div>
            <span className="text-hype-pink animate-pulse">:</span>
            <div className="flex flex-col items-center"><span className="text-hype-orange">{timeLeft.s.toString().padStart(2, '0')}</span><span className="text-xs text-gray-500 font-sans tracking-widest">SEGS</span></div>
        </div>
    );
};

// --- MODAIS DE ADMINISTRAÇÃO ---

const AdminLoginModal = ({ isOpen, onClose, onLogin }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user === "adm1" && pass === "1234") {
            onLogin();
            onClose();
            setUser("");
            setPass("");
            setError("");
        } else {
            setError("Credenciais inválidas. Acesso negado.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#111] border border-white/10 w-full max-w-sm p-8 rounded-3xl shadow-2xl animate-slide-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-hype-purple/10 text-hype-purple rounded-2xl flex items-center justify-center mx-auto mb-4 border border-hype-purple/20">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white">Acesso Restrito</h2>
                    <p className="text-gray-500 text-sm font-mono">Protocolo de Segurança Admin</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink transition-colors font-mono placeholder-gray-600" placeholder="ID de Usuário" /></div>
                    <div><input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink transition-colors font-mono placeholder-gray-600" placeholder="Senha de Acesso" /></div>
                    {error && (<div className="text-red-500 text-xs font-mono bg-red-500/10 p-3 rounded-lg border border-red-500/20 flex items-center gap-2"><ShieldCheck size={14} /> {error}</div>)}
                    <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-hype-pink hover:text-white transition-all">AUTENTICAR</button>
                </form>
            </div>
        </div>
    );
};

// Modal de Produto Genérico (Para Loja, Drops e Cofre)
const ProductModal = ({ isOpen, onClose, onSave, itemToEdit, type }) => {
    // Estado unificado para todos os tipos de campos
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (itemToEdit) {
            setFormData(itemToEdit);
        } else {
            // Defaults baseados no tipo
            if (type === 'shop') setFormData({ name: '', price: '', category: 'Tênis', image: '', tag: '', rarity: 'comum' });
            if (type === 'drops') setFormData({ title: '', date: '', desc: '', status: 'CONFIRMADO' });
            if (type === 'vault') setFormData({ name: '', price: 'ESGOTADO', image: '' });
        }
    }, [itemToEdit, isOpen, type]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        let processedData = { ...formData };
        if (type === 'shop' && typeof processedData.price === 'string') {
            processedData.price = parseFloat(processedData.price.replace('R$', '').replace(',', '.'));
        }
        onSave(processedData, type);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#111] border border-white/10 w-full max-w-lg p-8 rounded-3xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase">
                    {itemToEdit ? 'Editar' : 'Novo'} {type === 'shop' ? 'Item da Loja' : type === 'drops' ? 'Drop' : 'Item do Cofre'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* CAMPOS PARA LOJA E COFRE */}
                    {(type === 'shop' || type === 'vault') && (
                        <>
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Nome do Item</label>
                                <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink" required />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">URL da Imagem</label>
                                <input type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink" placeholder="https://..." required />
                            </div>
                        </>
                    )}

                    {/* CAMPOS EXCLUSIVOS LOJA */}
                    {type === 'shop' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Preço</label>
                                    <input type="number" step="0.01" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink" required />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Categoria</label>
                                    <select value={formData.category || 'Tênis'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink">
                                        {CATEGORIES.filter(c => c !== "Todos").map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Tag (Opcional)</label>
                                    <input type="text" value={formData.tag || ''} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Raridade</label>
                                    <select value={formData.rarity || 'comum'} onChange={e => setFormData({...formData, rarity: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink">
                                        {RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {/* CAMPOS EXCLUSIVOS COFRE */}
                    {type === 'vault' && (
                        <div>
                            <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Status</label>
                            <input type="text" value={formData.price || 'ESGOTADO'} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink" />
                        </div>
                    )}

                    {/* CAMPOS EXCLUSIVOS DROPS */}
                    {type === 'drops' && (
                        <>
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Título do Drop</label>
                                <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Data</label>
                                    <input type="text" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink" placeholder="Ex: 25 DEZ" required />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Status</label>
                                    <select value={formData.status || 'CONFIRMADO'} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink">
                                        <option value="CONFIRMADO">CONFIRMADO</option>
                                        <option value="EM BREVE">EM BREVE</option>
                                        <option value="SECRETO">SECRETO</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Descrição</label>
                                <textarea value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hype-pink h-24" required />
                            </div>
                        </>
                    )}

                    <button type="submit" className="w-full bg-hype-pink text-white font-black py-4 rounded-xl hover:bg-white hover:text-black transition-all mt-4">SALVAR DADOS</button>
                </form>
            </div>
        </div>
    );
};

// Componente do Dashboard Admin (Com Abas)
const AdminDashboard = ({ products, drops, vault, onCreate, onEdit, onDelete }) => {
    const [activeTab, setActiveTab] = useState('shop'); // shop | drops | vault

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-slide-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-display font-black text-white">PAINEL DE <span className="text-hype-purple">CONTROLE</span></h2>
                    <p className="text-gray-400 font-mono">Gerenciamento de Conteúdo Global</p>
                </div>
                <div className="flex gap-4">
                     {/* Seletor de Abas Admin */}
                     <div className="bg-white/5 p-1 rounded-xl flex">
                        <button onClick={() => setActiveTab('shop')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'shop' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>LOJA</button>
                        <button onClick={() => setActiveTab('drops')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'drops' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>DROPS</button>
                        <button onClick={() => setActiveTab('vault')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'vault' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>COFRE</button>
                    </div>

                    <button onClick={() => onCreate(activeTab)} className="bg-hype-pink text-white px-6 py-2 rounded-xl font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                        <Plus size={18} /> NOVO
                    </button>
                </div>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs font-mono uppercase tracking-wider">
                            <tr>
                                {activeTab === 'shop' && <><th className="px-6 py-4">Produto</th><th className="px-6 py-4">Categoria</th><th className="px-6 py-4">Preço</th><th className="px-6 py-4">Raridade</th></>}
                                {activeTab === 'drops' && <><th className="px-6 py-4">Data</th><th className="px-6 py-4">Título</th><th className="px-6 py-4">Descrição</th><th className="px-6 py-4">Status</th></>}
                                {activeTab === 'vault' && <><th className="px-6 py-4">Item</th><th className="px-6 py-4">Status</th></>}
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeTab === 'shop' && products.map((p) => (
                                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden"><img src={p.image} className="w-full h-full object-cover" alt="" /></div>
                                            <div><p className="font-bold text-white text-sm">{p.name}</p>{p.tag && <span className="text-[10px] bg-hype-orange/20 text-hype-orange px-2 py-0.5 rounded border border-hype-orange/30">{p.tag}</span>}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{p.category}</td>
                                    <td className="px-6 py-4 font-mono text-white">R$ {p.price.toFixed(2)}</td>
                                    <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-white/10 text-white">{p.rarity}</span></td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => onEdit(p, 'shop')} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><Edit size={16} /></button>
                                            <button onClick={() => onDelete(p.id, 'shop')} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {activeTab === 'drops' && drops.map((d) => (
                                <tr key={d.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-hype-pink">{d.date}</td>
                                    <td className="px-6 py-4 font-bold text-white">{d.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">{d.desc}</td>
                                    <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-white/10 text-white">{d.status}</span></td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => onEdit(d, 'drops')} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><Edit size={16} /></button>
                                            <button onClick={() => onDelete(d.id, 'drops')} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                             {activeTab === 'vault' && vault.map((v) => (
                                <tr key={v.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden"><img src={v.image} className="w-full h-full object-cover" alt="" /></div>
                                            <p className="font-bold text-white text-sm">{v.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-500">{v.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => onEdit(v, 'vault')} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><Edit size={16} /></button>
                                            <button onClick={() => onDelete(v.id, 'vault')} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Componente da Caixa Misteriosa
const MysteryBox = ({ onOpen }) => {
    const [isOpening, setIsOpening] = useState(false);
    
    const handleTry = () => {
        setIsOpening(true);
        setTimeout(() => {
            setIsOpening(false);
            onOpen();
        }, 2500); // 2.5s de suspense
    };

    return (
        <div className="h-[60vh] flex flex-col items-center justify-center px-6 text-center animate-slide-up relative">
             {/* Efeitos de Fundo */}
             <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isOpening ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-[500px] h-[500px] bg-hype-pink/20 rounded-full blur-[100px] animate-pulse"></div>
             </div>

            <div className={`relative group cursor-pointer mb-8 transition-transform duration-1000 ${isOpening ? 'scale-125 rotate-[360deg]' : 'hover:scale-105'}`}>
                <div className="absolute inset-0 bg-hype-purple blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <Box size={120} className={`text-white relative z-10 ${isOpening ? 'animate-spin' : 'animate-bounce'}`} strokeWidth={1} />
            </div>
            
            <h2 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-hype-purple via-white to-hype-pink">
                {isOpening ? "ABRINDO..." : "CAIXA MISTERIOSA"}
            </h2>
            
            {!isOpening && (
                <>
                    <p className="text-gray-400 max-w-md mb-8">Arrisque 500 créditos para desbloquear um item aleatório de raridade Rara ou superior.</p>
                    <button 
                        onClick={handleTry}
                        className="bg-white text-black font-black px-12 py-4 rounded-full hover:bg-hype-pink hover:text-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        TENTAR A SORTE (R$ 199)
                    </button>
                </>
            )}
        </div>
    );
};

// Modal de Recompensa
const RewardModal = ({ item, onClose }) => {
    if (!item) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" onClick={onClose}>
             <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
             <div className="relative z-10 flex flex-col items-center text-center animate-slide-up">
                 <div className="text-hype-orange font-mono font-bold tracking-widest text-xl mb-4 animate-bounce">VOCÊ GANHOU!</div>
                 <div className="w-64 h-64 rounded-3xl overflow-hidden border-4 border-hype-pink shadow-[0_0_50px_rgba(236,72,153,0.5)] mb-8">
                     <img src={item.image} className="w-full h-full object-cover" />
                 </div>
                 <h2 className="text-4xl font-black text-white mb-2">{item.name}</h2>
                 <p className="text-hype-purple font-mono text-xl mb-8">Raridade: {item.rarity.toUpperCase()}</p>
                 <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">RESGATAR ITEM</button>
             </div>
        </div>
    );
}

export default function App() {
    const [currentTab, setCurrentTab] = useState("shop");
    const [activeCategory, setActiveCategory] = useState("Todos");
    
    // ESTADOS GLOBAIS DE DADOS
    const [products, setProducts] = useState(MOCK_DROPS);
    const [drops, setDrops] = useState(INITIAL_DROPS);
    const [vault, setVault] = useState(INITIAL_VAULT);
    
    const [cart, setCart] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Estados de Administração
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    
    // Edição
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editingType, setEditingType] = useState('shop'); // shop | drops | vault

    // Mystery Box
    const [wonItem, setWonItem] = useState(null);

    // Lógica de Filtro
    const filteredProducts = useMemo(() => {
        if (activeCategory === "Todos") return products;
        return products.filter(p => p.category === activeCategory);
    }, [activeCategory, products]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setIsCartOpen(true);
    };

    // --- FUNÇÕES CRUD UNIFICADAS ---
    
    const openCreateModal = (type) => {
        setEditingType(type);
        setEditingItem(null);
        setIsProductModalOpen(true);
    };

    const openEditModal = (item, type) => {
        setEditingType(type);
        setEditingItem(item);
        setIsProductModalOpen(true);
    };

    const handleSave = (data, type) => {
        const isEdit = !!data.id;
        const newItem = { ...data, id: isEdit ? data.id : Date.now() };

        if (type === 'shop') {
            if (isEdit) setProducts(products.map(p => p.id === newItem.id ? newItem : p));
            else setProducts([...products, newItem]);
        } else if (type === 'drops') {
            if (isEdit) setDrops(drops.map(d => d.id === newItem.id ? newItem : d));
            else setDrops([...drops, newItem]);
        } else if (type === 'vault') {
            if (isEdit) setVault(vault.map(v => v.id === newItem.id ? newItem : v));
            else setVault([...vault, newItem]);
        }
    };

    const handleDelete = (id, type) => {
        if (window.confirm("Tem certeza que deseja deletar este item?")) {
            if (type === 'shop') setProducts(products.filter(p => p.id !== id));
            else if (type === 'drops') setDrops(drops.filter(d => d.id !== id));
            else if (type === 'vault') setVault(vault.filter(v => v.id !== id));
        }
    };

    // Lógica da Mystery Box
    const handleMysteryOpen = () => {
        // Filtra apenas itens Raros, Épicos ou Lendários para ganhar
        const pool = products.filter(p => ['raro', 'épico', 'lendário', 'mítico'].includes(p.rarity));
        const randomItem = pool[Math.floor(Math.random() * pool.length)];
        setWonItem(randomItem || products[0]); // Fallback se pool vazia
        // Opcional: Adicionar ao carrinho automaticamente
        if (randomItem) addToCart(randomItem);
    };

    // Renderização de Conteúdo
    const renderContent = () => {
        if (currentTab === 'admin' && isAdmin) {
            return (
                <AdminDashboard 
                    products={products} 
                    drops={drops}
                    vault={vault}
                    onCreate={openCreateModal}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                />
            );
        }

        switch(currentTab) {
            case 'drops':
                return (
                    <div className="max-w-4xl mx-auto px-6 py-12 animate-slide-up">
                        <h2 className="text-4xl font-display font-black mb-12 text-center">CALENDÁRIO DE <span className="text-hype-purple">LANÇAMENTOS</span></h2>
                        <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-hype-pink before:to-transparent">
                            {drops.map((drop, idx) => (
                                <div key={drop.id} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="flex-1 md:text-right">
                                        {idx % 2 !== 0 && <div className="hidden md:block">
                                            <h3 className="text-2xl font-bold">{drop.title}</h3>
                                            <p className="text-gray-400">{drop.desc}</p>
                                        </div>}
                                        <div className="md:hidden pl-12">
                                            <h3 className="text-2xl font-bold">{drop.title}</h3>
                                            <p className="text-gray-400">{drop.desc}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 bg-hype-orange rounded-full shadow-[0_0_10px_#f97316]"></div>
                                    <div className="flex-1">
                                         <span className="text-hype-pink font-mono font-bold text-xl pl-12 md:pl-0">{drop.date}</span>
                                         {idx % 2 === 0 && <div className="hidden md:block">
                                            <h3 className="text-2xl font-bold mt-2">{drop.title}</h3>
                                            <p className="text-gray-400">{drop.desc}</p>
                                        </div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'vault':
                return (
                    <div className="max-w-7xl mx-auto px-6 py-12 animate-slide-up">
                        <div className="text-center mb-12">
                            <Lock size={48} className="mx-auto text-gray-600 mb-4" />
                            <h2 className="text-4xl font-display font-black text-gray-500">O COFRE</h2>
                            <p className="text-gray-600">Arquivo de itens lendários que nunca mais voltarão.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-700">
                            {vault.map((item) => (
                                <div key={item.id} className="relative group border border-white/5 rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center font-black text-3xl -rotate-12 tracking-widest text-white/20 border-4 border-white/20 m-8">{item.price}</div>
                                    <img src={item.image} className="w-full h-80 object-cover opacity-50" />
                                    <div className="p-6">
                                        <h3 className="font-bold text-xl text-gray-400">{item.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'mystery':
                return <MysteryBox onOpen={handleMysteryOpen} />;
            default: // SHOP
                return (
                    <>
                        <div className="px-6 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                            <div className="max-w-7xl mx-auto flex gap-4 min-w-max">
                                {CATEGORIES.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex flex-col items-center gap-2 group min-w-[80px]`}
                                    >
                                        <div className={`w-16 h-16 rounded-full border-2 p-1 flex items-center justify-center transition-all ${activeCategory === cat ? 'border-hype-pink scale-110' : 'border-white/20 group-hover:border-white'}`}>
                                            <div className={`w-full h-full rounded-full bg-white/5 ${activeCategory === cat ? 'bg-gradient-to-tr from-hype-purple to-hype-orange' : ''}`}></div>
                                        </div>
                                        <span className={`text-xs font-bold uppercase ${activeCategory === cat ? 'text-white' : 'text-gray-500'}`}>{cat}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="px-6 pb-20">
                            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="group relative bg-hype-card rounded-3xl overflow-hidden border border-white/5 hover:border-hype-purple/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.3)]">
                                        <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md ${
                                            product.rarity === 'mítico' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-orange-500/20' : 
                                            product.rarity === 'lendário' ? 'bg-hype-purple/80 text-white' : 
                                            product.rarity === 'épico' ? 'bg-blue-500/80 text-white' :
                                            'bg-black/60 text-gray-300'
                                        }`}>
                                            <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                {product.rarity === 'mítico' && <Flame size={10} />}
                                                {product.rarity || 'Comum'}
                                            </span>
                                        </div>

                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                            
                                            <button 
                                                onClick={() => addToCart(product)}
                                                className="absolute bottom-4 right-4 z-20 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-hype-pink hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                            >
                                                <Zap size={20} fill="currentColor" />
                                            </button>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-hype-pink transition-colors line-clamp-1">{product.name}</h3>
                                            <div className="flex justify-between items-end mt-2">
                                                <div>
                                                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">{product.category}</p>
                                                    <span className="text-xl font-display font-bold text-white">R$ {product.price.toFixed(2)}</span>
                                                </div>
                                                {product.rarity === 'mítico' && <Award className="text-yellow-500 animate-pulse" size={20} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-hype-dark text-white font-sans selection:bg-hype-pink selection:text-white">
            <AdminLoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
                onLogin={() => {
                    setIsAdmin(true);
                    setCurrentTab('admin');
                }} 
            />

            <ProductModal 
                isOpen={isProductModalOpen} 
                onClose={() => setIsProductModalOpen(false)} 
                onSave={handleSave} 
                itemToEdit={editingItem}
                type={editingType}
            />
            
            <RewardModal item={wonItem} onClose={() => setWonItem(null)} />

            <Marquee />
            
            <nav className="glass sticky top-0 z-40 px-6 py-4 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white"><Menu /></button>
                        <h1 onClick={() => setCurrentTab('shop')} className="font-display text-2xl font-bold italic tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent select-none cursor-pointer hover:opacity-80 transition-opacity">
                            HYPE<span className="text-hype-pink">.</span>DROP
                        </h1>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
                        <button onClick={() => setCurrentTab('shop')} className={`hover:text-hype-pink transition-colors ${currentTab === 'shop' ? 'text-hype-pink' : 'text-gray-400'}`}>Loja</button>
                        <button onClick={() => setCurrentTab('drops')} className={`hover:text-hype-pink transition-colors ${currentTab === 'drops' ? 'text-hype-pink' : 'text-gray-400'}`}>Drops</button>
                        <button onClick={() => setCurrentTab('vault')} className={`hover:text-hype-pink transition-colors ${currentTab === 'vault' ? 'text-hype-pink' : 'text-gray-400'}`}>Cofre</button>
                        <button onClick={() => setCurrentTab('mystery')} className={`hover:text-hype-pink transition-colors ${currentTab === 'mystery' ? 'text-hype-pink' : 'text-gray-400'}`}>Mistery</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block w-48">
                            <PredictiveSearch products={products} onSearch={(term) => console.log(term)} />
                        </div>
                        
                        {isAdmin ? (
                            <button onClick={() => setCurrentTab('admin')} title="Painel Admin" className={`relative p-2 rounded-full transition-colors ${currentTab === 'admin' ? 'text-hype-pink bg-white/10' : 'text-white hover:bg-white/10'}`}>
                                <LayoutDashboard size={20} />
                            </button>
                        ) : (
                            <button onClick={() => setIsLoginModalOpen(true)} title="Acesso Admin" className="relative p-2 rounded-full text-white hover:bg-white/10 transition-colors">
                                <Lock size={20} />
                            </button>
                        )}

                        <button className="relative group" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag className="text-white group-hover:text-hype-pink transition-colors" />
                            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-hype-orange text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">{cart.length}</span>}
                        </button>

                        {isAdmin && (
                            <button onClick={() => { setIsAdmin(false); setCurrentTab('shop'); }} title="Sair" className="text-gray-500 hover:text-red-500 transition-colors">
                                <LogOut size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <div className={`fixed inset-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <div className="absolute left-0 top-0 h-full w-3/4 bg-hype-card border-r border-white/10 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="font-display text-2xl font-bold italic">MENU</h2>
                        <button onClick={() => setIsMenuOpen(false)}><X /></button>
                    </div>
                    <div className="space-y-6 flex-1">
                        <button onClick={() => {setCurrentTab('shop'); setIsMenuOpen(false)}} className="text-2xl font-black uppercase text-white hover:text-hype-pink block">Loja</button>
                        <button onClick={() => {setCurrentTab('drops'); setIsMenuOpen(false)}} className="text-2xl font-black uppercase text-white hover:text-hype-pink block">Drops</button>
                        <button onClick={() => {setCurrentTab('vault'); setIsMenuOpen(false)}} className="text-2xl font-black uppercase text-white hover:text-hype-pink block">Cofre</button>
                        <button onClick={() => {setCurrentTab('mystery'); setIsMenuOpen(false)}} className="text-2xl font-black uppercase text-hype-purple hover:text-white block">Caixa Misteriosa</button>
                        {isAdmin && <button onClick={() => {setCurrentTab('admin'); setIsMenuOpen(false)}} className="text-2xl font-black uppercase text-green-500 hover:text-white block">Painel Admin</button>}
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 z-[60] pointer-events-none`}>
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#090909] border-l border-white/10 shadow-2xl transform transition-transform duration-300 pointer-events-auto ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                        <h2 className="font-display text-xl font-bold tracking-widest">BOLSA ({cart.length})</h2>
                        <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                                <ShoppingBag size={64} className="mb-6 stroke-1"/>
                                <p className="font-mono text-sm">SUA BOLSA ESTÁ VAZIA.</p>
                                <p className="font-mono text-xs mt-2 text-hype-pink">ADICIONE ALGO ANTES QUE ESGOTE.</p>
                            </div>
                        ) : (
                            cart.map((item, idx) => (
                                <div key={idx} className="flex gap-4 bg-white/5 p-3 rounded-xl animate-slide-up border border-white/5 hover:border-hype-pink/30 transition-colors">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5">
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h4 className="font-bold line-clamp-1">{item.name}</h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm text-hype-purple font-mono">R$ {item.price.toFixed(2)}</p>
                                            <button onClick={() => setCart(cart.filter((_, i) => i !== idx))} className="text-xs text-gray-500 hover:text-white underline">Remover</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                        <div className="flex justify-between mb-2 font-mono text-sm text-gray-400">
                            <span>Subtotal</span>
                            <span>R$ {cart.reduce((a,b) => a + b.price, 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-6 font-display font-black text-2xl">
                            <span>TOTAL</span>
                            <span className="text-hype-pink">R$ {cart.reduce((a,b) => a + b.price, 0).toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-hype-pink hover:text-white transition-all transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Finalizar Compra
                        </button>
                        <div className="mt-4 flex justify-center gap-2 text-gray-600 text-xs items-center">
                            <ShieldCheck size={12} /> Checkout Seguro & Criptografado
                        </div>
                    </div>
                </div>
            </div>

            {currentTab === 'shop' && (
                <header className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hype-purple/30 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-hype-orange/20 rounded-full blur-[80px] -z-10"></div>
                    
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <div className="mb-8 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                            <span className="text-xs font-bold tracking-widest uppercase">Próximo Drop em:</span>
                        </div>
                        
                        <div className="flex justify-center mb-12">
                            <DropCountdown />
                        </div>

                        <h1 className="font-display text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter mix-blend-overlay opacity-90">
                            MODA<br/>FUTURA
                        </h1>
                        
                        <p className="text-gray-400 max-w-xl mx-auto text-lg mb-10 font-light leading-relaxed">
                            A interseção entre moda urbana e tecnologia distópica. 
                            <span className="text-white font-bold"> Qualidade premium</span>, quantidades limitadas.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-black px-10 py-4 rounded-full font-black hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                                EXPLORAR <ArrowRight size={20} />
                            </button>
                            <button onClick={() => setCurrentTab('drops')} className="border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/10 hover:border-white transition-colors">
                                CALENDÁRIO
                            </button>
                        </div>
                    </div>
                </header>
            )}

            <main className="flex-1">
                {renderContent()}
            </main>

            <footer className="border-t border-white/5 py-16 px-6 bg-black mt-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="font-display text-3xl font-bold italic mb-4">HYPE<span className="text-hype-pink">.</span>DROP</h2>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            Redefinindo o streetwear para a era digital. Produtos autênticos, comunidade global e tecnologia pronta para blockchain.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Suporte</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li className="hover:text-white cursor-pointer">Status do Pedido</li>
                            <li className="hover:text-white cursor-pointer">Envios & Devoluções</li>
                            <li className="hover:text-white cursor-pointer">FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Legal</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li className="hover:text-white cursor-pointer">Termos de Uso</li>
                            <li className="hover:text-white cursor-pointer">Privacidade</li>
                            <li className="hover:text-white cursor-pointer">Contato</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-xs font-mono">
                    © 2025 HYPEDROP INC. TODOS OS DIREITOS RESERVADOS. TÓQUIO • NY • SP
                </div>
            </footer>
        </div>
    );
};