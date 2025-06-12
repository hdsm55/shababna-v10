import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  // State for programs data
  const [programs, setPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch programs from Supabase
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (error) throw error;
        
        setPrograms(data || []);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch programs'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);

  // Core values data
  const coreValues = [
    {
      icon: Heart,
      title: t('values.compassion.title'),
      description: t('values.compassion.description'),
    },
    {
      icon: Globe,
      title: t('values.sustainability.title'),
      description: t('values.sustainability.description'),
    },
    {
      icon: Target,
      title: t('values.excellence.title'),
      description: t('values.excellence.description'),
    },
    {
      icon: Users,
      title: t('values.community.title'),
      description: t('values.community.description'),
    },
  ];

  // Calculate progress percentage
  const getProgressPercentage = (current?: number, goal?: number) => {
    if (!current || !goal) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - Optimized with lazy loading */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/videos/hero-poster.jpg"
            loading="lazy"
          >
            <source src="/videos/hero-hevc.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai"
            >
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              {t('hero.organization')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-tajawal font-bold text-white text-4xl sm:text-5xl md:text-6xl mb-6"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-almarai text-white/90 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12"
            >
              <Link to="/join">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                  className="font-tajawal"
                >
                  {t('hero.button')}
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 font-tajawal"
              >
                {t('hero.learnMore')}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/60 cursor-pointer hover:text-white/80 transition-colors duration-300"
          >
            <span className="text-xs font-almarai mb-2">
              {t('hero.scrollDown')}
            </span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-tajawal">
              {t('programs.heading')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
              {t('programs.subheading')}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader size="lg" color="primary" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>{error.message}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="primary"
                className="mt-4"
              >
                {t('common.retry')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.length > 0 ? programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                      <img
                        src={program.image_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-center text-white mb-2">
                          <h3 className="text-xl font-bold font-tajawal">{program.title}</h3>
                          <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                            {getProgressPercentage(program.current_amount, program.goal_amount)}%
                          </span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-1.5">
                          <div
                            className="bg-secondary h-1.5 rounded-full"
                            style={{ width: `${getProgressPercentage(program.current_amount, program.goal_amount)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <CardContent>
                      <p className="text-gray-600 mb-4 font-almarai">{program.description}</p>
                      <Link to={`/programs/${program.id}`}>
                        <Button
                          variant="primary"
                          rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                          fullWidth
                        >
                          {t('programs.learnMore')}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500 font-almarai">{t('programs.no_results')}</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/programs">
              <Button
                variant="outline"
                rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                className="border-primary text-primary hover:bg-primary/5"
              >
                {t('programs.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-tajawal">
              {t('values.heading')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
              {t('values.subheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <CardContent>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-tajawal">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 font-almarai">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tajawal">
              {t('cta.headline')}
            </h2>
            <p className="text-xl text-white/80 mb-8 font-almarai">
              {t('cta.subheadline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                >
                  {t('cta.buttons.join')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('cta.buttons.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;