import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header com logo Itaú */}
      <header className="bg-primary py-4 px-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-primary-foreground rounded px-2 py-1">
              <span className="text-primary font-bold text-xl">itaú</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side - Text content */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Consultar Fatura Itaú</h1>
            <p className="text-base text-foreground leading-relaxed">receba a 2ª via da fatura do cartão por e-mail</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6">
              Mantenha seus dados sempre atualizados. Ao acessar você aceita seu perfil ou entra em contato pelo
              atendimento.
            </p>
          </div>

          {/* Right side - Form card */}
          <Card className="p-8 shadow-md">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm text-foreground">
                  nome completo
                </Label>
                <Input id="nome" type="text" placeholder="" className="bg-background border-border h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-nascimento" className="text-sm text-foreground">
                  data de nascimento
                </Label>
                <Input id="data-nascimento" type="date" placeholder="" className="bg-background border-border h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm text-foreground">
                  CPF
                </Label>
                <Input id="cpf" type="text" placeholder="" className="bg-background border-border h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agencia" className="text-sm text-foreground">
                  agência
                </Label>
                <Input id="agencia" type="text" placeholder="" className="bg-background border-border h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number" className="text-sm text-foreground">
                  número do cartão
                </Label>
                <Input id="card-number" type="text" placeholder="" className="bg-background border-border h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-sm text-foreground">
                  senha de acesso
                </Label>
                <Input id="senha" type="password" placeholder="" className="bg-background border-border h-11" />
              </div>

              <Button type="submit" className="w-full bg-muted hover:bg-muted/80 text-foreground h-11 font-normal">
                Acessar
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
