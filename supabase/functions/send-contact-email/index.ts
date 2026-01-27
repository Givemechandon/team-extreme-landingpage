import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptContact: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();

  try {
    const { name, email, phone, message, acceptContact }: ContactEmailRequest = await req.json();

    if (!Deno.env.get("RESEND_API_KEY")) {
      console.error(`[send-contact-email:${requestId}] Missing RESEND_API_KEY`);
      return new Response(
        JSON.stringify({ error: "Configuração de email ausente." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`[send-contact-email:${requestId}] Incoming request`, {
      name,
      email,
      phone,
      acceptContact,
      messageLength: message?.length,
    });

    // Send notification email to Team Extreme
    const notificationEmail = await resend.emails.send({
      // IMPORTANTE: para enviar para qualquer destinatário, o domínio do remetente precisa estar verificado no Resend.
      from: "Team Extreme <contato@teamextreme.com.br>",
      to: ["mario@teamextreme.com.br"],
      reply_to: email,
      subject: `Nova Solicitação de Orçamento - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 16px; margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #f59e0b; margin-top: 10px; }
            .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎯 Nova Solicitação de Orçamento</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Recebido via website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nome</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">E-mail</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Telefone</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Mensagem</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <div class="label">Aceita receber comunicações</div>
                <div class="value">${acceptContact ? '✅ Sim' : '❌ Não'}</div>
              </div>
            </div>
            <div class="footer">
              <p>Este email foi enviado automaticamente pelo site Team Extreme</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Resend can return { id } or { data, error } depending on SDK version
    const notificationAny = notificationEmail as any;
    const notificationError = notificationAny?.error ?? notificationAny?.data?.error;
    if (notificationError) {
      console.error(`[send-contact-email:${requestId}] Notification email error`, notificationError);
      throw new Error(notificationError?.message || "Falha ao enviar email para a equipe.");
    }

    console.log(`[send-contact-email:${requestId}] Notification email response`, notificationEmail);

    // Send confirmation email to customer
    const confirmationEmail = await resend.emails.send({
      from: "Team Extreme <contato@teamextreme.com.br>",
      to: [email],
      subject: "Recebemos sua solicitação - Team Extreme",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0c0f14, #1a1f2e); color: white; padding: 40px; border-radius: 10px 10px 0 0; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; color: #f59e0b; }
            .content { background: #f9f9f9; padding: 30px; }
            .highlight { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .cta { display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
            .footer { background: #0c0f14; color: white; padding: 30px; border-radius: 0 0 10px 10px; text-align: center; }
            .social a { color: #f59e0b; margin: 0 10px; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">TEAM EXTREME</div>
              <p style="color: #f59e0b; margin: 10px 0 0 0;">Atrações Radicais para Eventos</p>
            </div>
            <div class="content">
              <h2 style="color: #0c0f14;">Olá ${name}! 👋</h2>
              <p>Recebemos sua solicitação de orçamento e estamos muito felizes com seu interesse!</p>
              
              <div class="highlight">
                <h3 style="color: #f59e0b; margin-top: 0;">📋 Próximos passos:</h3>
                <ul>
                  <li>Nossa equipe analisará sua solicitação</li>
                  <li>Entraremos em contato em até <strong>24 horas úteis</strong></li>
                  <li>Prepararemos um orçamento personalizado para seu evento</li>
                </ul>
              </div>

              <p>Enquanto isso, que tal conhecer um pouco mais sobre nossas atrações?</p>
              
              <center>
                <a href="https://teamextreme.lovable.app" class="cta">Visitar Site</a>
              </center>

              <p style="color: #666; font-size: 14px;">
                Se tiver qualquer dúvida urgente, ligue para <strong>(11) 95550-6239</strong> ou responda este email.
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0; color: #f59e0b; font-weight: bold;">Team Extreme Sports</p>
              <p style="margin: 10px 0; font-size: 14px;">+30 anos levando atrações e transformando eventos em experiências inesquecíveis</p>
              <div class="social">
                <a href="https://instagram.com/teamextremesports">Instagram</a>
                <a href="https://facebook.com/teamextremesports">Facebook</a>
                <a href="https://wa.me/5511955506239">WhatsApp</a>
              </div>
              <p style="font-size: 12px; color: #888; margin-top: 20px;">
                R. José de Oliveira, 1065 - São Paulo/SP
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    const confirmationAny = confirmationEmail as any;
    const confirmationError = confirmationAny?.error ?? confirmationAny?.data?.error;
    if (confirmationError) {
      console.error(`[send-contact-email:${requestId}] Confirmation email error`, confirmationError);
      throw new Error(confirmationError?.message || "Falha ao enviar confirmação ao cliente.");
    }

    console.log(`[send-contact-email:${requestId}] Confirmation email response`, confirmationEmail);

    return new Response(
      JSON.stringify({
        success: true,
        requestId,
        notification: {
          id: (notificationAny?.id ?? notificationAny?.data?.id) || null,
        },
        confirmation: {
          id: (confirmationAny?.id ?? confirmationAny?.data?.id) || null,
          to: email,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error(`[send-contact-email:${requestId}] Error in send-contact-email function:`, error);
    return new Response(
      JSON.stringify({ error: error?.message || "Erro ao enviar email.", requestId }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
