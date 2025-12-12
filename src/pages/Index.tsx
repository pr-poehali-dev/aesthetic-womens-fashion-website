import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string[];
  sizes: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Спортивный топ Rose",
    price: 3990,
    image: "https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/8cfd3ac6-8e3b-40db-b56c-b0da17fec38f.jpg",
    category: "tops",
    color: ["pink", "white"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 2,
    name: "Леггинсы Premium Pink",
    price: 5490,
    image: "https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/1468e2ef-7e8d-4c9d-96d9-b6fd14ae905c.jpg",
    category: "leggings",
    color: ["pink", "coral"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Комплект для йоги",
    price: 7990,
    image: "https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/9322f204-a6ff-4586-bd8c-7b72d416cc70.jpg",
    category: "sets",
    color: ["pink", "white", "coral"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 4,
    name: "Спортивный бюстгальтер",
    price: 2990,
    image: "https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/8cfd3ac6-8e3b-40db-b56c-b0da17fec38f.jpg",
    category: "bras",
    color: ["pink", "coral"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 5,
    name: "Укороченный топ Flex",
    price: 3490,
    image: "https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/1468e2ef-7e8d-4c9d-96d9-b6fd14ae905c.jpg",
    category: "tops",
    color: ["white", "pink"],
    sizes: ["XS", "S", "M"]
  },
  {
    id: 6,
    name: "Велосипедки Essential",
    price: 3290,
    image: "https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/9322f204-a6ff-4586-bd8c-7b72d416cc70.jpg",
    category: "shorts",
    color: ["pink", "coral", "white"],
    sizes: ["XS", "S", "M", "L"]
  }
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'collections' | 'contacts'>('home');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const categories = [
    { id: 'tops', label: 'Топы' },
    { id: 'bras', label: 'Бюстгальтеры' },
    { id: 'leggings', label: 'Леггинсы' },
    { id: 'shorts', label: 'Шорты' },
    { id: 'sets', label: 'Комплекты' }
  ];

  const colors = [
    { id: 'pink', label: 'Розовый', hex: '#FFB3C6' },
    { id: 'coral', label: 'Коралловый', hex: '#FF8FA3' },
    { id: 'white', label: 'Белый', hex: '#FFFFFF' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const colorMatch = selectedColors.length === 0 || product.color.some(c => selectedColors.includes(c));
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(s => selectedSizes.includes(s));
    return categoryMatch && priceMatch && colorMatch && sizeMatch;
  });

  const toggleFilter = (value: string, filterArray: string[], setFilter: (arr: string[]) => void) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(item => item !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-heading text-primary">ROSE ACTIVE</h1>
            <div className="hidden md:flex gap-8">
              <button onClick={() => setCurrentPage('home')} className={`transition-colors ${currentPage === 'home' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}>
                Главная
              </button>
              <button onClick={() => setCurrentPage('catalog')} className={`transition-colors ${currentPage === 'catalog' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}>
                Каталог
              </button>
              <button onClick={() => setCurrentPage('collections')} className={`transition-colors ${currentPage === 'collections' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}>
                Коллекции
              </button>
              <button onClick={() => setCurrentPage('contacts')} className={`transition-colors ${currentPage === 'contacts' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}>
                Контакты
              </button>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingBag" size={20} />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Меню</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8">
                    <button onClick={() => setCurrentPage('home')} className="text-left text-lg">Главная</button>
                    <button onClick={() => setCurrentPage('catalog')} className="text-left text-lg">Каталог</button>
                    <button onClick={() => setCurrentPage('collections')} className="text-left text-lg">Коллекции</button>
                    <button onClick={() => setCurrentPage('contacts')} className="text-left text-lg">Контакты</button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {currentPage === 'home' && (
        <>
          <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10" />
            <div className="relative z-10 text-center px-4 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 text-foreground">
                Спорт в розовом цвете
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Эстетичная спортивная одежда для тех, кто ценит стиль и комфорт
              </p>
              <Button size="lg" onClick={() => setCurrentPage('catalog')} className="text-lg px-8">
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </section>

          <section className="container mx-auto px-4 py-16">
            <h3 className="text-3xl font-bold font-heading text-center mb-12">Популярные товары</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product, idx) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                    <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-secondary/30 py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Бесплатная доставка</h4>
                  <p className="text-muted-foreground">При заказе от 5000 ₽</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="RefreshCw" size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Легкий возврат</h4>
                  <p className="text-muted-foreground">30 дней на возврат товара</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Heart" size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Качество Premium</h4>
                  <p className="text-muted-foreground">Только лучшие материалы</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === 'catalog' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold font-heading mb-8">Каталог товаров</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Фильтры</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Цена</Label>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={10000}
                        step={100}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0]} ₽</span>
                        <span>{priceRange[1]} ₽</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Категория</Label>
                    <div className="space-y-3">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleFilter(category.id, selectedCategories, setSelectedCategories)}
                          />
                          <Label htmlFor={category.id} className="cursor-pointer font-normal">
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Цвет</Label>
                    <div className="space-y-3">
                      {colors.map(color => (
                        <div key={color.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={color.id}
                            checked={selectedColors.includes(color.id)}
                            onCheckedChange={() => toggleFilter(color.id, selectedColors, setSelectedColors)}
                          />
                          <Label htmlFor={color.id} className="cursor-pointer flex items-center gap-2 font-normal">
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.hex }} />
                            {color.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Размер</Label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map(size => (
                        <Badge
                          key={size}
                          variant={selectedSizes.includes(size) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 10000) && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedColors([]);
                        setSelectedSizes([]);
                        setPriceRange([0, 10000]);
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {product.color.map(c => {
                          const colorObj = colors.find(col => col.id === c);
                          return colorObj ? (
                            <div key={c} className="w-5 h-5 rounded-full border" style={{ backgroundColor: colorObj.hex }} />
                          ) : null;
                        })}
                      </div>
                      <Button className="w-full" size="sm">
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {currentPage === 'collections' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold font-heading mb-8">Коллекции</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="overflow-hidden group cursor-pointer animate-fade-in">
              <div className="relative h-96">
                <img 
                  src="https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/1468e2ef-7e8d-4c9d-96d9-b6fd14ae905c.jpg" 
                  alt="Весенняя коллекция" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-3xl font-bold font-heading mb-2">Весна 2024</h3>
                    <p className="text-lg mb-4">Нежные оттенки для новых свершений</p>
                    <Button variant="secondary">Смотреть коллекцию</Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group cursor-pointer animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="relative h-96">
                <img 
                  src="https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/8cfd3ac6-8e3b-40db-b56c-b0da17fec38f.jpg" 
                  alt="Базовая коллекция" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-3xl font-bold font-heading mb-2">Базовая</h3>
                    <p className="text-lg mb-4">Классика, которая всегда в моде</p>
                    <Button variant="secondary">Смотреть коллекцию</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <img 
                src="https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/9322f204-a6ff-4586-bd8c-7b72d416cc70.jpg" 
                alt="Premium коллекция" 
                className="w-full h-full object-cover"
              />
              <div className="p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4">Эксклюзив</Badge>
                <h3 className="text-4xl font-bold font-heading mb-4">Premium Line</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Лимитированная коллекция из премиальных материалов. 
                  Создана для тех, кто не идет на компромиссы в вопросах качества и стиля.
                </p>
                <Button size="lg" className="w-fit">
                  Узнать больше
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}

      {currentPage === 'contacts' && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold font-heading mb-8 text-center">Контакты</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="animate-fade-in">
                <h3 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Спортивная, 15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">hello@roseactive.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Вс: 10:00 - 21:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon">
                      <Icon name="Instagram" size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Facebook" size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Twitter" size={20} />
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h3 className="text-2xl font-semibold mb-6">Напишите нам</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Анна" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="anna@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea id="message" rows={4} placeholder="Ваше сообщение..." />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </form>
              </Card>
            </div>

            <div className="mt-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Card className="overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.620393,55.753960&z=17&l=map&pt=37.620393,55.753960,pm2rdm"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  className="w-full"
                  title="Карта местоположения"
                />
              </Card>
            </div>

            <div className="mt-16">
              <h2 className="text-4xl font-bold font-heading mb-4 text-center">Наша команда</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Познакомьтесь с профессионалами, которые помогут вам выбрать идеальную спортивную форму
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0ms' }}>
                  <img 
                    src="https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/fcf20d63-bc4c-4569-a26c-f58a69272f54.jpg" 
                    alt="Анна Петрова" 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-bold mb-1">Анна Петрова</h4>
                    <p className="text-primary font-medium mb-3">Управляющая магазином</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      5 лет опыта в индустрии спортивной моды
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Instagram" size={18} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Linkedin" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '100ms' }}>
                  <img 
                    src="https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/9a3fa860-36e2-4c41-8f68-72ced8f91108.jpg" 
                    alt="Мария Соколова" 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-bold mb-1">Мария Соколова</h4>
                    <p className="text-primary font-medium mb-3">Фитнес-консультант</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Сертифицированный тренер, эксперт по подбору формы
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Instagram" size={18} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Linkedin" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '200ms' }}>
                  <img 
                    src="https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/a1fbb302-d395-419b-9014-efd022ab862e.jpg" 
                    alt="Елена Волкова" 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-bold mb-1">Елена Волкова</h4>
                    <p className="text-primary font-medium mb-3">Инструктор йоги</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Специалист по йога-аксессуарам и одежде
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Instagram" size={18} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Linkedin" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '300ms' }}>
                  <img 
                    src="https://cdn.poehali.dev/projects/f28aa268-e3fd-4de1-9dc5-cdd73aba4906/files/a1a88ebf-6962-4035-b321-42851bcac727.jpg" 
                    alt="Дмитрий Кузнецов" 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-bold mb-1">Дмитрий Кузнецов</h4>
                    <p className="text-primary font-medium mb-3">Персональный тренер</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Консультант по спортивной экипировке для тренировок
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Instagram" size={18} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Linkedin" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-secondary/20 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">ROSE ACTIVE</h3>
              <p className="text-muted-foreground">
                Эстетичная спортивная одежда для активного образа жизни
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Подписка</h4>
              <p className="text-muted-foreground mb-4">Получайте новости о новинках и акциях</p>
              <div className="flex gap-2">
                <Input placeholder="Email" />
                <Button size="icon">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ROSE ACTIVE. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;