'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface Application {
  id: string;
  application_id: string;
  full_name: string;
  risk_level: 'green' | 'yellow' | 'red';
  screening_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
}

interface MedicalHistoryData {
  hasCardiacCondition?: boolean;
  cardiacDetails?: string;
  hasHypertension?: boolean;
  hypertensionControlled?: boolean;
  hasDiabetes?: boolean;
  diabetesType?: 'tipo1' | 'tipo2';
  hasEpilepsy?: boolean;
  hasLiverProblems?: boolean;
  hasKidneyProblems?: boolean;
  isPregnant?: boolean;
  isBreastfeeding?: boolean;
  hadRecentSurgery?: boolean;
  surgeryDetails?: string;
}

interface MedicationsData {
  takingMedications?: boolean;
  hasMaoiInhibitors?: boolean;
  hasSsriAntidepressants?: boolean;
  ssriDetails?: string;
  hasLithium?: boolean;
  hasAntipsychotics?: boolean;
  hasCardiacMedications?: boolean;
  otherMedications?: string;
  supplements?: string;
}

interface MentalHealthData {
  hasPsychoticDisorder?: boolean;
  hasSchizophrenia?: boolean;
  hasBipolar?: boolean;
  hasCurrentDepression?: boolean;
  hasCurrentAnxiety?: boolean;
  isInPsychiatricTreatment?: boolean;
  treatmentDetails?: string;
  hasHistoryOfCrisis?: boolean;
  hasSuicidalIdeation?: boolean;
  hasEatingDisorder?: boolean;
  hasActiveAddiction?: boolean;
  addictionDetails?: string;
}

interface LifestyleData {
  alcoholConsumption?: 'nunca' | 'ocasional' | 'frecuente' | 'diario';
  recreationalSubstances?: boolean;
  substanceDetails?: string;
  dietaryRestrictions?: string;
  foodAllergies?: string;
  physicalLimitations?: string;
  hasPreviousExperience?: boolean;
  previousExperienceDetails?: string;
}

interface IntentionsData {
  whyParticipate?: string;
  whatToHeal?: string;
  howFoundUs?: string;
  questions?: string;
}

interface HubspotBackupData {
  hubspotData: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    application_id: string;
    screening_status: string;
    risk_level: string;
    has_medication_flags: string;
    has_mental_health_flags: string;
    funnel_source: string;
    landing_page: string;
    how_found_us: string;
    why_participate: string;
    what_to_heal: string;
  };
  riskLevel: string;
  submittedAt: string;
  hubspotPortalId: string;
  hubspotFormId: string;
  backupCreatedAt: string;
}

interface DecryptedData {
  contact: {
    phone: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
  medical: {
    medicalHistory: MedicalHistoryData;
    medications: MedicationsData;
    mentalHealth: MentalHealthData;
  };
  lifestyle: {
    lifestyle: LifestyleData;
    intentions: IntentionsData;
  };
}

// Medical field labels in Spanish
const MEDICAL_LABELS: Record<string, string> = {
  hasCardiacCondition: 'Condicion cardiaca',
  cardiacDetails: 'Detalles cardiacos',
  hasHypertension: 'Hipertension',
  hypertensionControlled: 'Hipertension controlada',
  hasDiabetes: 'Diabetes',
  diabetesType: 'Tipo de diabetes',
  hasEpilepsy: 'Epilepsia',
  hasLiverProblems: 'Problemas hepaticos',
  hasKidneyProblems: 'Problemas renales',
  isPregnant: 'Embarazada',
  isBreastfeeding: 'Lactando',
  hadRecentSurgery: 'Cirugia reciente',
  surgeryDetails: 'Detalles de cirugia',
};

const MEDICATION_LABELS: Record<string, string> = {
  takingMedications: 'Toma medicamentos',
  hasMaoiInhibitors: 'Inhibidores MAO',
  hasSsriAntidepressants: 'Antidepresivos ISRS',
  ssriDetails: 'Detalles ISRS',
  hasLithium: 'Litio',
  hasAntipsychotics: 'Antipsicoticos',
  hasCardiacMedications: 'Medicamentos cardiacos',
  otherMedications: 'Otros medicamentos',
  supplements: 'Suplementos',
};

const MENTAL_HEALTH_LABELS: Record<string, string> = {
  hasPsychoticDisorder: 'Trastorno psicotico',
  hasSchizophrenia: 'Esquizofrenia',
  hasBipolar: 'Trastorno bipolar',
  hasCurrentDepression: 'Depresion actual',
  hasCurrentAnxiety: 'Ansiedad actual',
  isInPsychiatricTreatment: 'En tratamiento psiquiatrico',
  treatmentDetails: 'Detalles del tratamiento',
  hasHistoryOfCrisis: 'Historial de crisis',
  hasSuicidalIdeation: 'Ideacion suicida (ultimos 6 meses)',
  hasEatingDisorder: 'Trastorno alimenticio',
  hasActiveAddiction: 'Adiccion activa',
  addictionDetails: 'Detalles de adiccion',
};

const LIFESTYLE_LABELS: Record<string, string> = {
  alcoholConsumption: 'Consumo de alcohol',
  recreationalSubstances: 'Sustancias recreativas',
  substanceDetails: 'Detalles de sustancias',
  dietaryRestrictions: 'Restricciones dieteticas',
  foodAllergies: 'Alergias alimentarias',
  physicalLimitations: 'Limitaciones fisicas',
  hasPreviousExperience: 'Experiencia previa con plantas',
  previousExperienceDetails: 'Detalles de experiencia',
};

const ALCOHOL_LABELS: Record<string, string> = {
  nunca: 'Nunca',
  ocasional: 'Ocasional',
  frecuente: 'Frecuente',
  diario: 'Diario',
};

export default function AdminApplicationsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [decryptedData, setDecryptedData] = useState<DecryptedData | null>(null);
  const [hubspotBackup, setHubspotBackup] = useState<HubspotBackupData | null>(null);
  const [decrypting, setDecrypting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | 'green' | 'yellow' | 'red'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  // Dashboard stats
  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(a => a.screening_status === 'pending').length,
      approved: applications.filter(a => a.screening_status === 'approved').length,
      rejected: applications.filter(a => a.screening_status === 'rejected').length,
      green: applications.filter(a => a.risk_level === 'green').length,
      yellow: applications.filter(a => a.risk_level === 'yellow').length,
      red: applications.filter(a => a.risk_level === 'red').length,
    };
  }, [applications]);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = searchQuery === '' ||
        app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.application_id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === 'all' || app.screening_status === filter;
      const matchesRisk = riskFilter === 'all' || app.risk_level === riskFilter;
      return matchesSearch && matchesFilter && matchesRisk;
    });
  }, [applications, searchQuery, filter, riskFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'true');
      fetchApplications();
    } else {
      setAuthError('Contrasena incorrecta');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/applications');
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const handleDecrypt = async (applicationId: string) => {
    if (selectedApp === applicationId && decryptedData) {
      setSelectedApp(null);
      setDecryptedData(null);
      setHubspotBackup(null);
      return;
    }

    setDecrypting(true);
    setSelectedApp(applicationId);
    setHubspotBackup(null);

    try {
      // Fetch both decrypted data and HubSpot backup in parallel
      const [decryptRes, hubspotRes] = await Promise.all([
        fetch(`/api/admin/decrypt?id=${applicationId}`),
        fetch(`/api/admin/hubspot-backup?applicationId=${applicationId}`)
      ]);

      if (decryptRes.ok) {
        const data = await decryptRes.json();
        setDecryptedData(data);
      }

      if (hubspotRes.ok) {
        const hubspotData = await hubspotRes.json();
        if (!hubspotData.error) {
          setHubspotBackup(hubspotData);
        }
      }
    } catch (error) {
      console.error('Error decrypting:', error);
    }
    setDecrypting(false);
  };

  const handleStatusUpdate = async (applicationId: string, status: 'approved' | 'rejected') => {
    setUpdating(applicationId);
    const res = await fetch('/api/admin/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, status }),
    });

    if (res.ok) {
      fetchApplications();
      if (selectedApp === applicationId) {
        setSelectedApp(null);
        setDecryptedData(null);
      }
    }
    setUpdating(null);
  };

  const openWhatsApp = (phone: string, name: string, applicationId: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hola ${name.split(' ')[0]}, soy del equipo Floresiendo. Recibimos tu solicitud (${applicationId}) y nos gustaria conversar contigo sobre algunos detalles.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  useEffect(() => {
    if (localStorage.getItem('admin_session') === 'true') {
      setIsAuthenticated(true);
      fetchApplications();
    }
  }, []);

  // Render a field with proper formatting
  const renderField = (value: unknown, key: string): React.ReactNode => {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center text-coral font-medium">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Si
        </span>
      ) : (
        <span className="text-warm-gray-400">No</span>
      );
    }
    if (key === 'alcoholConsumption') {
      return <span className="text-warm-gray-700">{ALCOHOL_LABELS[value as string] || value}</span>;
    }
    if (key === 'diabetesType') {
      return <span className="text-warm-gray-700">{value === 'tipo1' ? 'Tipo 1' : 'Tipo 2'}</span>;
    }
    return <span className="text-warm-gray-700">{String(value)}</span>;
  };

  // Render data section with proper labels
  const renderDataSection = (
    data: Record<string, unknown>,
    labels: Record<string, string>,
    title: string,
    icon: React.ReactNode
  ) => {
    const entries = Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== '' && value !== false
    );

    if (entries.length === 0) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-700">
            {icon}
            <span className="font-medium">{title}</span>
          </div>
          <p className="text-green-600 text-sm mt-2">Sin banderas detectadas</p>
        </div>
      );
    }

    const hasFlags = entries.some(([, value]) => value === true);

    return (
      <div className={`border rounded-xl p-4 ${hasFlags ? 'bg-gold/10 border-gold' : 'bg-white border-warm-gray-200'}`}>
        <div className={`flex items-center gap-2 mb-3 ${hasFlags ? 'text-gold-dark' : 'text-warm-gray-700'}`}>
          {icon}
          <span className="font-medium">{title}</span>
          {hasFlags && (
            <span className="ml-auto text-xs bg-gold text-white px-2 py-0.5 rounded-full">
              Revisar
            </span>
          )}
        </div>
        <div className="space-y-2">
          {entries.map(([key, value]) => (
            <div key={key} className="flex justify-between items-start text-sm">
              <span className="text-warm-gray-500">{labels[key] || key}:</span>
              <span className="text-right ml-4">{renderField(value, key)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="glass bg-white/95 p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/floresiendo-logo-boton.webp"
                alt="Floresiendo"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-warm-gray-800">Panel de Administracion</h1>
            <p className="text-warm-gray-500 text-sm mt-1">Floresiendo - Solicitudes</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contrasena"
            className="w-full p-4 border border-warm-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white"
            autoFocus
          />
          {authError && (
            <div className="bg-coral/10 border border-coral text-coral text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {authError}
            </div>
          )}
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="bg-white border-b border-warm-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="section-container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image
                  src="/floresiendo-logo-boton.webp"
                  alt="Floresiendo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-warm-gray-800">Solicitudes de Screening</h1>
                <p className="text-xs text-warm-gray-500">Panel de Administracion</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('admin_session');
                setIsAuthenticated(false);
              }}
              className="btn-ghost text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="card-elevated p-4">
            <p className="text-3xl font-bold text-warm-gray-800">{stats.total}</p>
            <p className="text-sm text-warm-gray-500">Total</p>
          </div>
          <div className="card-elevated p-4 bg-gold/10 border-gold">
            <p className="text-3xl font-bold text-gold-dark">{stats.pending}</p>
            <p className="text-sm text-gold-dark">Pendientes</p>
          </div>
          <div className="card-elevated p-4 bg-green-50 border-green-200">
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-green-600">Aprobados</p>
          </div>
          <div className="card-elevated p-4 bg-coral/10 border-coral">
            <p className="text-3xl font-bold text-coral">{stats.rejected}</p>
            <p className="text-sm text-coral">Rechazados</p>
          </div>
          <div className="card-elevated p-4 bg-green-50 border-green-200">
            <p className="text-3xl font-bold text-green-600">{stats.green}</p>
            <p className="text-sm text-green-600">Riesgo Verde</p>
          </div>
          <div className="card-elevated p-4 bg-gold/10 border-gold">
            <p className="text-3xl font-bold text-gold-dark">{stats.yellow}</p>
            <p className="text-sm text-gold-dark">Riesgo Amarillo</p>
          </div>
          <div className="card-elevated p-4 bg-coral/10 border-coral">
            <p className="text-3xl font-bold text-coral">{stats.red}</p>
            <p className="text-sm text-coral">Riesgo Rojo</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre o ID..."
                  className="w-full pl-10 pr-4 py-2.5 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent bg-white transition-all"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="border border-warm-gray-200 rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobados</option>
                <option value="rejected">Rechazados</option>
              </select>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as typeof riskFilter)}
                className="border border-warm-gray-200 rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
              >
                <option value="all">Todos los riesgos</option>
                <option value="green">Verde</option>
                <option value="yellow">Amarillo</option>
                <option value="red">Rojo</option>
              </select>
              <button
                onClick={fetchApplications}
                className="btn-ghost"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-warm-gray-500 mb-4">
          Mostrando {filteredApplications.length} de {applications.length} solicitudes
        </p>

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-coral border-t-transparent"></div>
            <p className="text-warm-gray-500 mt-4">Cargando solicitudes...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <svg className="w-16 h-16 text-warm-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-warm-gray-500 text-lg">No hay solicitudes que coincidan con los filtros</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div key={app.id} className="card-interactive overflow-hidden">
                <div
                  className="p-5 cursor-pointer hover:bg-warm-gray-50 transition-colors"
                  onClick={() => handleDecrypt(app.application_id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Risk indicator */}
                      <div className={`w-3 h-3 rounded-full ${
                        app.risk_level === 'green' ? 'bg-green-500' :
                        app.risk_level === 'yellow' ? 'bg-gold' : 'bg-coral'
                      }`} />
                      <div>
                        <p className="font-semibold text-warm-gray-800">{app.full_name}</p>
                        <p className="text-sm text-warm-gray-500 font-mono">{app.application_id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Risk badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.risk_level === 'green' ? 'bg-green-100 text-green-700' :
                        app.risk_level === 'yellow' ? 'bg-gold/20 text-gold-dark' : 'bg-coral/20 text-coral-dark'
                      }`}>
                        {app.risk_level === 'green' ? 'Verde' :
                         app.risk_level === 'yellow' ? 'Amarillo' : 'Rojo'}
                      </span>
                      {/* Status badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.screening_status === 'pending' ? 'bg-gold/20 text-gold-dark' :
                        app.screening_status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-coral/20 text-coral-dark'
                      }`}>
                        {app.screening_status === 'pending' ? 'Pendiente' :
                         app.screening_status === 'approved' ? 'Aprobado' : 'Rechazado'}
                      </span>
                      {/* Date */}
                      <span className="text-sm text-warm-gray-400">
                        {new Date(app.created_at).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      {/* Expand icon */}
                      <svg
                        className={`w-5 h-5 text-warm-gray-400 transition-transform duration-300 ${selectedApp === app.application_id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded view with decrypted data */}
                {selectedApp === app.application_id && (
                  <div className="border-t border-warm-gray-200 bg-warm-gray-50 p-6 animate-slide-down">
                    {decrypting ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-coral border-t-transparent"></div>
                        <p className="text-warm-gray-500 mt-2">Desencriptando datos...</p>
                      </div>
                    ) : decryptedData ? (
                      <div className="space-y-6">
                        {/* Contact Info */}
                        <div className="bg-white rounded-xl border border-warm-gray-200 p-4">
                          <div className="flex items-center gap-2 mb-4 text-warm-gray-700">
                            <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-medium">Informacion de Contacto</span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-warm-gray-500 mb-1">Telefono</p>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-warm-gray-800">{decryptedData.contact.phone}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openWhatsApp(decryptedData.contact.phone, app.full_name, app.application_id);
                                  }}
                                  className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                  </svg>
                                  WhatsApp
                                </button>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-warm-gray-500 mb-1">Contacto de Emergencia</p>
                              <p className="font-medium text-warm-gray-800">{decryptedData.contact.emergencyContactName || 'No especificado'}</p>
                              <p className="text-sm text-warm-gray-600">{decryptedData.contact.emergencyContactPhone || ''}</p>
                            </div>
                          </div>
                        </div>

                        {/* HubSpot CRM Data */}
                        {hubspotBackup && (
                          <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
                            <div className="flex items-center gap-2 mb-4 text-orange-700">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.986V3.06A2.06 2.06 0 0017.37 1h-.038a2.06 2.06 0 00-2.06 2.06v.038c0 .844.47 1.575 1.163 1.943v2.859c-.642.139-1.232.4-1.74.755l-5.905-4.608a2.635 2.635 0 00.135-.826A2.63 2.63 0 006.295 0a2.63 2.63 0 00-2.63 2.63 2.63 2.63 0 002.63 2.63c.467 0 .904-.12 1.285-.333l5.795 4.521a4.316 4.316 0 00-.536 2.09c0 .723.177 1.405.489 2.004l-2.072 2.072a2.397 2.397 0 00-.837-.15 2.41 2.41 0 00-2.41 2.41A2.41 2.41 0 0010.418 20a2.41 2.41 0 002.41-2.41c0-.31-.058-.607-.165-.88l2.025-2.025a4.322 4.322 0 002.849 1.071c2.393 0 4.333-1.94 4.333-4.333a4.333 4.333 0 00-3.706-4.285zM17.537 19.2a2.777 2.777 0 01-2.777-2.777 2.777 2.777 0 012.777-2.777 2.777 2.777 0 012.777 2.777 2.777 2.777 0 01-2.777 2.777z"/>
                              </svg>
                              <span className="font-medium">Datos en HubSpot CRM</span>
                              <span className="ml-auto text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">
                                Backup local
                              </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-orange-600 mb-1">Email</p>
                                <p className="font-medium text-warm-gray-800">{hubspotBackup.hubspotData.email}</p>
                              </div>
                              <div>
                                <p className="text-orange-600 mb-1">Telefono</p>
                                <p className="font-medium text-warm-gray-800">{hubspotBackup.hubspotData.phone}</p>
                              </div>
                              <div>
                                <p className="text-orange-600 mb-1">Enviado a HubSpot</p>
                                <p className="font-medium text-warm-gray-800">
                                  {new Date(hubspotBackup.submittedAt).toLocaleString('es-MX')}
                                </p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${hubspotBackup.hubspotData.has_medication_flags === 'true' ? 'bg-gold' : 'bg-green-500'}`} />
                                <span className="text-warm-gray-600">Banderas de medicamentos:</span>
                                <span className={`font-medium ${hubspotBackup.hubspotData.has_medication_flags === 'true' ? 'text-gold-dark' : 'text-green-600'}`}>
                                  {hubspotBackup.hubspotData.has_medication_flags === 'true' ? 'Si' : 'No'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${hubspotBackup.hubspotData.has_mental_health_flags === 'true' ? 'bg-gold' : 'bg-green-500'}`} />
                                <span className="text-warm-gray-600">Banderas de salud mental:</span>
                                <span className={`font-medium ${hubspotBackup.hubspotData.has_mental_health_flags === 'true' ? 'text-gold-dark' : 'text-green-600'}`}>
                                  {hubspotBackup.hubspotData.has_mental_health_flags === 'true' ? 'Si' : 'No'}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-orange-200 text-xs text-orange-600">
                              <span className="font-mono">Portal: {hubspotBackup.hubspotPortalId}</span>
                              <span className="mx-2">•</span>
                              <span className="font-mono">Form: {hubspotBackup.hubspotFormId}</span>
                            </div>
                          </div>
                        )}

                        {/* Medical Sections */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {renderDataSection(
                            decryptedData.medical.medicalHistory || {},
                            MEDICAL_LABELS,
                            'Historial Medico',
                            <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          )}
                          {renderDataSection(
                            decryptedData.medical.medications || {},
                            MEDICATION_LABELS,
                            'Medicamentos',
                            <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {renderDataSection(
                            decryptedData.medical.mentalHealth || {},
                            MENTAL_HEALTH_LABELS,
                            'Salud Mental',
                            <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          )}
                          {renderDataSection(
                            decryptedData.lifestyle.lifestyle || {},
                            LIFESTYLE_LABELS,
                            'Estilo de Vida',
                            <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          )}
                        </div>

                        {/* Intentions */}
                        {decryptedData.lifestyle.intentions && (
                          <div className="bg-white rounded-xl border border-warm-gray-200 p-4">
                            <div className="flex items-center gap-2 mb-4 text-warm-gray-700">
                              <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                              <span className="font-medium">Intenciones</span>
                            </div>
                            <div className="space-y-4">
                              {decryptedData.lifestyle.intentions.whyParticipate && (
                                <div>
                                  <p className="text-sm text-warm-gray-500 mb-1">Por que deseas participar?</p>
                                  <p className="text-warm-gray-700">{decryptedData.lifestyle.intentions.whyParticipate}</p>
                                </div>
                              )}
                              {decryptedData.lifestyle.intentions.whatToHeal && (
                                <div>
                                  <p className="text-sm text-warm-gray-500 mb-1">Que buscas sanar?</p>
                                  <p className="text-warm-gray-700">{decryptedData.lifestyle.intentions.whatToHeal}</p>
                                </div>
                              )}
                              {decryptedData.lifestyle.intentions.howFoundUs && (
                                <div>
                                  <p className="text-sm text-warm-gray-500 mb-1">Como nos encontraste?</p>
                                  <p className="text-warm-gray-700">{decryptedData.lifestyle.intentions.howFoundUs}</p>
                                </div>
                              )}
                              {decryptedData.lifestyle.intentions.questions && (
                                <div>
                                  <p className="text-sm text-warm-gray-500 mb-1">Preguntas adicionales</p>
                                  <p className="text-warm-gray-700">{decryptedData.lifestyle.intentions.questions}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Actions for pending applications */}
                        {app.screening_status === 'pending' && (
                          <div className="flex flex-wrap gap-3 pt-4 border-t border-warm-gray-200">
                            <button
                              onClick={() => handleStatusUpdate(app.application_id, 'approved')}
                              disabled={updating === app.application_id}
                              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app.application_id, 'rejected')}
                              disabled={updating === app.application_id}
                              className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-full font-medium hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Rechazar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openWhatsApp(decryptedData.contact.phone, app.full_name, app.application_id);
                              }}
                              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-all shadow-lg hover:shadow-xl ml-auto"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              Contactar por WhatsApp
                            </button>
                          </div>
                        )}

                        {/* Audit info */}
                        {app.reviewed_by && (
                          <div className="text-xs text-warm-gray-400 pt-4 border-t border-warm-gray-200 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Revisado por {app.reviewed_by} el {new Date(app.reviewed_at!).toLocaleString('es-MX')}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-coral/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-coral">Error al desencriptar los datos</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
